import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { Otp } from '../otp/models/otp.model';
import { Token } from '../token/models/token.model';
import { SendOtpDto } from './dto/sent-otp.dto';
import * as otpGenerator from 'otp-generator';
import { AddMinutesToDate } from '../helper/addMinutes';
import { dates, decode, encode } from '../helper/crypto';
import { ValidateOtp } from './dto/validate-otp.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentRepo: typeof Student,
    @InjectModel(Otp) private otpRepo: typeof Otp,
    @InjectModel(Token) private tokenRepo: typeof Token,
    private readonly jwtService: JwtService, 
    ){}


  async sendOtp(sendOtpDto: SendOtpDto) {
    const phone = sendOtpDto.phone;
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    });

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    
    const newOtp = await this.otpRepo.create({otp, expiration: expiration_time})
    const student = await this.studentRepo.findOne({where: {phone: phone}, include:{all:true}})
    
    let message: string;
    if(!student){
      message="new student" 
    }else{
      message="old student"
    }

    const details = {
      timestamp: now,
      check: phone,
      otp_id: newOtp.id,
    } 
    console.log(otp);
  
    const encoded = await encode(JSON.stringify(details));
    return {message, Details: encoded}
  }


  async validateOtpNewStudent(createStudentDto: CreateStudentDto,  req: any){
      
    
    const {varification_key, otp, check} = createStudentDto;
    const getOtp = await this.otpCheck(varification_key, otp, check)

    const updatedOtp = await this.otpRepo.update({verified: true}, {where: {id: getOtp.id}})
    const newStudent = await this.studentRepo.create({...createStudentDto, phone: check, otp_id: getOtp.id})
    const tokens = await this.generateToken(newStudent);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7);
    
    const deviceToken = await this.tokenRepo.create({student_id: newStudent.id, student_device: req.device.ua, hashed_refresh_token })

    return {
      message: "new student",
      updatedOtp,
      newStudent,
      deviceToken,
      tokens
    }
  }


  async validateOtpOldStudent(validateOtp: ValidateOtp,  req: any){
      
    const {varification_key, otp, check} = validateOtp;
    
    const getOtp = await this.otpCheck(varification_key, otp, check)

    const student = await this.studentRepo.findOne({where: {phone: check}, include:{all:true}})

  

    const deviceNumber = await this.tokenRepo.count({where: {student_id: student.id}});
    const currentDevice = await this.tokenRepo.findOne({where: {student_device: req.device.ua}})
    if(deviceNumber==2 && !currentDevice){
      await this.tokenRepo.destroy({where: {student_id: student.id}})
    }

 
    
    const updatedStudent = await this.studentRepo.update({otp_id: getOtp.id}, {where: {id:student.id}, returning: true});
    const updatedOtp = await this.otpRepo.update({verified: true}, {where: {id: getOtp.id}})
    await this.otpRepo.destroy({where: {id:student.otp_id}});

    const tokens = await this.generateToken(updatedStudent[1][0]);


    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7);
    if(currentDevice){
      const deviceToken = await this.tokenRepo.update({hashed_refresh_token }, {where: {id: currentDevice.id}, returning: true})
      
      return {
        message: "old student's old device",
        updatedOtp,
        student: updatedStudent[1][0],
        device: deviceToken[1][0],
        tokens
      }
    }
    const deviceToken = await this.tokenRepo.create({ student_id: student.id, student_device: req.device.ua, hashed_refresh_token })
    
    return {
      message: "old student's new device",
      updatedOtp,
      student: updatedStudent[1][0],
      deviceToken,
      tokens
    }
  }


  async refreshToken(id: number, refreshTokenDto: RefreshTokenDto, req: any){
    let refresh_token;
    try {
        refresh_token = await this.jwtService.verify(refreshTokenDto.refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY
    });
    } catch (error) {
      console.log(error);
    }
   
    if(id != refresh_token.id){
      throw new BadRequestException('Student not found');
    }
    const deviceToken = await this.tokenRepo.findOne({where:{student_id: refresh_token.id, student_device: req.device.ua}});
    
    if(!deviceToken){
      throw new BadRequestException('Student not foud');
    }

    if(!deviceToken.hashed_refresh_token){
      throw new BadRequestException('token not found');
    }
    
    const tok = refreshTokenDto.refreshToken;
    const devToken = deviceToken.hashed_refresh_token
    console.log(tok, devToken);
    
    const tokenMatch = await bcrypt.compare(tok, devToken);
    console.log(tokenMatch);
    
    if(!tokenMatch){
      throw new ForbiddenException('Forbidden');
    }
    
    const student = await this.findOne(id);
    
    const tokens = await this.generateToken(student);

    const ref_token = tokens.refresh_token;
    const hashed_refresh_token = await bcrypt.hash(ref_token, 7);
    console.log(tokens.refresh_token, hashed_refresh_token);
    
    const updatedDeviceToken = await this.tokenRepo.update({hashed_refresh_token:hashed_refresh_token}, {where: {student_id: refresh_token.id, student_device: req.device.ua}, returning: true});
    
    return {
      message: "token updated",
      tokens,
      updatedDeviceToken: updatedDeviceToken[1][0],
      student
    }

  }

  findAlltoken() {
    return this.tokenRepo.findAll({include:{all:true}});
  }

  findAll() {
    return this.studentRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.studentRepo.findOne({where: {id}, include:{all:true}});
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepo.update(updateStudentDto, {where: {id}, returning: true});
  }

  async remove(id: number) {
    await this.tokenRepo.destroy({where: {student_id: id}});
    return this.studentRepo.destroy({where: {id}});
  }

  private async otpCheck(varification_key: string, otp: string, check: string){
    const currentdate = new Date();
    const decoded = await decode(varification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.check;
    if(check_obj != check){
      throw new BadRequestException('OTP bu raqamga junatilmagan');
    } 
    const getOtp = await this.otpRepo.findOne({where: {id:obj.otp_id}, include:{all:true}});
    if(!getOtp){
      throw new BadRequestException('OTP not found');
    };

    if(getOtp.verified){
      throw new BadRequestException('OTP already used');
    };
   

    if(!dates.compare(getOtp.expiration, currentdate)){
      throw new BadRequestException('OTP expired');
    }

    if(otp != getOtp.otp){
      throw new BadRequestException("OTP is not match")
    }

    return getOtp;
  }


  private async generateToken(client: Student){
    const jwtPayload = { id: client.id, otp_id: client.otp_id};
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ])
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }
}

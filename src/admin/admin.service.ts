import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LogoutAdminDto } from './dto/logout-admin.dto';
import { ActivateUserDto } from './dto/activate-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Injectable()
export class AdminService {

  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService
  ){}

  
  async registration(createAdminDto: CreateAdminDto) {
    const user = await this.adminRepo.findOne({
      where: {login: createAdminDto.login}
    })    
    
    if(user) {
      throw new BadRequestException('login already used!');
    }
    
    if(createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password,7);
    const newUser = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password
    })

    const tokens = await this.generateToken(newUser)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updateUser = await this.adminRepo.update({
      hashed_refresh_token: hashed_refresh_token,
    }, {where:{id: newUser.id}, returning: true});


    return {customer: updateUser[1][0], tokens}; 

  }

  async sigin(loginAdminDto: LoginAdminDto) {
    const {login, password} = loginAdminDto;
    const user = await this.adminRepo.findOne({ where: {login}});
    if(!user) {
      throw new BadRequestException('admin not found!!');
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('admin not registered(pass)!!');
    }

    const tokens = await this.generateToken(user)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updatedUser = await this.adminRepo.update({
      hashed_refresh_token: hashed_refresh_token},
     {where: {id: user.id}, returning: true}
    )

    return {
      message: "you are logged",
      user: updatedUser[1][0],
      tokens
    }
  } 

  async singout(id: number, logoutAdminDto: LogoutAdminDto){
    const {refreshToken} = logoutAdminDto
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if(!userData){
      throw new ForbiddenException('Admin not found');
    }

    if(id != userData.id){
      throw new ForbiddenException('Admin not found');
    }

    const user = await this.adminRepo.findOne({where: {id}})

    const isMatch = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
    if(!isMatch){
      throw new UnauthorizedException('Unauthorized admin');
    } 

    const updatedUser = await this.adminRepo.update({hashed_refresh_token: null}, {
      where: {id: userData.id}, returning: true
    });
    
 
    return updatedUser[1][0];
  }


  async activateUser(activateUserDto: ActivateUserDto) {
    const admin = await this.findOne(activateUserDto.admin_id);

    if(!admin) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND)
    }
  
    const updatedAdmin = await this.adminRepo.update({is_active: true}, {where: {id: activateUserDto.admin_id}, returning: true});

    return updatedAdmin;
  }
  
  
  async deActivateUser(deactivateUserDto: ActivateUserDto) {
    const admin = await this.findOne(deactivateUserDto.admin_id);
    
    if(!admin) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND)
    }
    const updatedAdmin = await this.adminRepo.update({is_active: false}, {where: {id: deactivateUserDto.admin_id}, returning: true});
    
    return updatedAdmin;
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto){
    const {old_password, new_password, confirm_password} = updatePasswordDto;
    const admin = await this.findOne(id);
    
    const isMatch = await bcrypt.compare(old_password, admin.hashed_password);
    if(!isMatch){
      throw new UnauthorizedException('password not correct')
    }

    if(new_password !== confirm_password){
      throw new BadRequestException('confirm password not match')
    }

    const hashed_password = await bcrypt.hash(new_password, 7);
    const updatedAdmin = await this.adminRepo.update({hashed_password}, {where:{id}, returning: true})
    return {
      message: "password updated",
      updatedAdmin
    }
  }
  

  
  private async generateToken(user: Admin){
    const jwtPayload = { id: user.id, is_active: user.is_active, is_creator: user.is_creator, is_admin: true };
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

  findAll() {
    return this.adminRepo.findAll({include: {all:true}});
  }

  findOne(id: number) {
    return this.adminRepo.findOne({where: {id}, include:{all:true}});
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepo.update(updateAdminDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.adminRepo.destroy({where: {id}});
  }
}

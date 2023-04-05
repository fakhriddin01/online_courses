import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SendOtpDto } from './dto/sent-otp.dto';
import { AddDeviceInfo } from '../decorators/addDeviceToReq';
import { ValidateOtp } from './dto/validate-otp.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}


  @Post('otp')
  sendOtp(@Body() sendOtpDto: SendOtpDto){
    return this.studentService.sendOtp(sendOtpDto)
  }

  @Post(':id/refresh')
  refreshToken(@Param('id') id: string, @Body() refreshTokenDto: RefreshTokenDto, @AddDeviceInfo() req: any){
    return this.studentService.refreshToken(+id, refreshTokenDto, req)
  }

  @Post('verify-new')
  validateOtpNewStudent(@Body() createStudentDto: CreateStudentDto, @AddDeviceInfo() req: any){
    return this.studentService.validateOtpNewStudent(createStudentDto, req)
  }

  @Post('verify-old')
  validateOtpOldStudent(@Body() validateOtp: ValidateOtp, @AddDeviceInfo() req: any){
    return this.studentService.validateOtpOldStudent(validateOtp, req)
  }


  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get('tokens')
  findAlltoken() {
    return this.studentService.findAlltoken();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}

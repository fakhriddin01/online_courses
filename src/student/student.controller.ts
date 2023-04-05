import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SendOtpDto } from './dto/sent-otp.dto';
import { AddDeviceInfo } from '../decorators/addDeviceToReq';
import { ValidateOtp } from './dto/validate-otp.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Studentlar bo`limi')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({summary: 'OTP jo`natish'})
  @Post('otp')
  sendOtp(@Body() sendOtpDto: SendOtpDto){
    return this.studentService.sendOtp(sendOtpDto)
  }

  @ApiOperation({summary: 'tokenni yangilash'})
  @Post(':id/refresh')
  refreshToken(@Param('id') id: string, @Body() refreshTokenDto: RefreshTokenDto, @AddDeviceInfo() req: any){
    return this.studentService.refreshToken(+id, refreshTokenDto, req)
  }

  @ApiOperation({summary: 'OTP tekshirish va yangi foydalanuvchini ro`yhatdan o`tkazish va tizimga kiritish'})
  @Post('verify-new')
  validateOtpNewStudent(@Body() createStudentDto: CreateStudentDto, @AddDeviceInfo() req: any){
    return this.studentService.validateOtpNewStudent(createStudentDto, req)
  }

  @ApiOperation({summary: 'OTP tekshirish va eski foydalanuvchini tizimga kiritish'})
  @Post('verify-old')
  validateOtpOldStudent(@Body() validateOtp: ValidateOtp, @AddDeviceInfo() req: any){
    return this.studentService.validateOtpOldStudent(validateOtp, req)
  }

  @ApiOperation({summary: 'OTP tekshirish va yangi foydalanuvchini ro`yhatdan o`tkazish'})
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({summary: 'barchar tokenlarni olish'})
  @Get('tokens')
  findAlltoken() {
    return this.studentService.findAlltoken();
  }

  @ApiOperation({summary: 'Bitta foynalanuvchini olish'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @ApiOperation({summary: 'Bitta foynalanuvchini o`zgartirish'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @ApiOperation({summary: 'Bitta foynalanuvchini o`chirish'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}

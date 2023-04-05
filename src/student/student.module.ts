import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { Otp } from '../otp/models/otp.model';
import { Token } from '../token/models/token.model';
import { JwtModule } from '@nestjs/jwt';
import { StudentCourse } from '../student_course/models/student_course.model';

@Module({
  imports: [SequelizeModule.forFeature([Student, Otp, Token, StudentCourse]),
  JwtModule.register({}),
],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}

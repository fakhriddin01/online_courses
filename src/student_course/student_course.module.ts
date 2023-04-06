import { Module } from '@nestjs/common';
import { StudentCourseService } from './student_course.service';
import { StudentCourseController } from './student_course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentCourse } from './models/student_course.model';
import { Student } from '../student/models/student.model';
import { Status } from '../status/models/status.model';
import { Course } from '../course/models/course.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([StudentCourse, Student, Status, Course]), JwtModule.register({})],
  controllers: [StudentCourseController],
  providers: [StudentCourseService]
})
export class StudentCourseModule {}

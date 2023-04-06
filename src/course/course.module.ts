import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './models/course.model';
import { Category } from '../category/models/category.model';
import { Teacher } from '../teacher/models/teacher.model';
import { JwtModule } from '@nestjs/jwt';

@Module({

  imports: [SequelizeModule.forFeature([Course, Category, Teacher]),
  JwtModule.register({})
],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}

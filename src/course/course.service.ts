import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './models/course.model';

@Injectable()
export class CourseService {

  constructor(@InjectModel(Course) private courseRepo: typeof Course ){}

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepo.create(createCourseDto);
  }

  findAll() {
    return this.courseRepo.findAll({include: {all:true}});
  }
  

  findOne(id: number) {
    return this.courseRepo.findOne({where: {id}, include:{all:true}});
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepo.update(updateCourseDto, {where: {id}});
  }

  remove(id: number) {
    return this.courseRepo.destroy({where: {id}});
  }
}

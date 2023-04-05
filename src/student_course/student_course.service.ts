import { Injectable } from '@nestjs/common';
import { CreateStudentCourseDto } from './dto/create-student_course.dto';
import { UpdateStudentCourseDto } from './dto/update-student_course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StudentCourse } from './models/student_course.model';

@Injectable()
export class StudentCourseService {

  constructor(@InjectModel(StudentCourse) private readonly studentCourseRepo: typeof StudentCourse){}

  async create(createStudentCourseDto: CreateStudentCourseDto) {
    return this.studentCourseRepo.create(createStudentCourseDto);
  }

  findAll() {
    return this.studentCourseRepo.findAll({include: {all:true}});
  }
  

  findOne(id: number) {
    return this.studentCourseRepo.findOne({where: {id}, include:{all:true}});
  }

  update(id: number, updateStudentCourseDto: UpdateStudentCourseDto) {
    return this.studentCourseRepo.update(updateStudentCourseDto, {where: {id}});
  }

  remove(id: number) {
    return this.studentCourseRepo.destroy({where: {id}});
  }
}

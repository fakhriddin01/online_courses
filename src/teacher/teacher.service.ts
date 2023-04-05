import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';

@Injectable()
export class TeacherService {

  constructor(@InjectModel(Teacher) private teacherRepo: typeof Teacher ){}

  create(createTeacherDto: CreateTeacherDto) {
    return this.teacherRepo.create(createTeacherDto);
  }

  findAll() {
    return this.teacherRepo.findAll({include: {all:true}});
  }
  

  findOne(id: number) {
    return this.teacherRepo.findOne({where: {id}, include:{all:true}});
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepo.update(updateTeacherDto, {where: {id}});
  }

  remove(id: number) {
    return this.teacherRepo.destroy({where: {id}});
  }
}

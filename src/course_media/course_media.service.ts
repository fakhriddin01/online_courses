import { Injectable } from '@nestjs/common';
import { CreateCourseMediaDto } from './dto/create-course_media.dto';
import { UpdateCourseMediaDto } from './dto/update-course_media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CourseMedia } from './models/course_media.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class CourseMediaService {

  constructor(
    @InjectModel(CourseMedia) private mediaRepo: typeof CourseMedia,
    private readonly fileService: FilesService
    ){}



  async create(createCourseMediaDto: CreateCourseMediaDto, file: Express.Multer.File) {

    const fileName = await this.fileService.createFile(file);
    return this.mediaRepo.create({...createCourseMediaDto, name: fileName});
  }

  findAll() {
    return this.mediaRepo.findAll({include: {all:true}});
  }
  

  findOne(id: number) {
    return this.mediaRepo.findOne({where: {id}, include:{all:true}});
  }

  async update(id: number, updateCourseMediaDto: UpdateCourseMediaDto, file?: Express.Multer.File) {
    let fileName;
    if(file){
      fileName =await this.fileService.createFile(file);
      return this.mediaRepo.update({...updateCourseMediaDto, name: fileName}, {where: {id}})
    }
    
    return this.mediaRepo.update(updateCourseMediaDto, {where: {id}})
  }

  async remove(id: number) {
    const media = await this.findOne(id);
    if(media.name){
      const fileName = await this.fileService.removeFile(media.name)
    }
    
    return this.mediaRepo.destroy({where: {id}});
  }
}

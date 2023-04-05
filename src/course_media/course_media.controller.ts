import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CourseMediaService } from './course_media.service';
import { CreateCourseMediaDto } from './dto/create-course_media.dto';
import { UpdateCourseMediaDto } from './dto/update-course_media.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('course-media')
export class CourseMediaController {
  constructor(private readonly courseMediaService: CourseMediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createCourseMediaDto: CreateCourseMediaDto, @UploadedFile() file: Express.Multer.File) {
    return this.courseMediaService.create(createCourseMediaDto, file);
  }

  @Get()
  findAll() {
    return this.courseMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseMediaService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: string, @Body() updateCourseMediaDto: UpdateCourseMediaDto, @UploadedFile() file?: Express.Multer.File) {
    return this.courseMediaService.update(+id, updateCourseMediaDto, file);
  }
    
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseMediaService.remove(+id);
  }
}

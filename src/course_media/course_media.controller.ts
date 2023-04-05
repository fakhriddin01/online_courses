import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CourseMediaService } from './course_media.service';
import { CreateCourseMediaDto } from './dto/create-course_media.dto';
import { UpdateCourseMediaDto } from './dto/update-course_media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Kurs Media contenti bo`limi')
@Controller('course-media')
export class CourseMediaController {
  constructor(private readonly courseMediaService: CourseMediaService) {}

  @ApiOperation({summary: 'Kurs mediasini yaratish'})
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createCourseMediaDto: CreateCourseMediaDto, @UploadedFile() file: Express.Multer.File) {
    return this.courseMediaService.create(createCourseMediaDto, file);
  }

  @ApiOperation({summary: 'Barcha medialarni olish'})
  @Get()
  findAll() {
    return this.courseMediaService.findAll();
  }

  @ApiOperation({summary: 'Bitta mediani olish'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseMediaService.findOne(+id);
  }

  @ApiOperation({summary: 'Bitta mediani o`zgartirish'})
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: string, @Body() updateCourseMediaDto: UpdateCourseMediaDto, @UploadedFile() file?: Express.Multer.File) {
    return this.courseMediaService.update(+id, updateCourseMediaDto, file);
  }
  
  @ApiOperation({summary: 'Bitta mediani o`chirish'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseMediaService.remove(+id);
  }
}

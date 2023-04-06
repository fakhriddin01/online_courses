import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { CourseMediaService } from './course_media.service';
import { CreateCourseMediaDto } from './dto/create-course_media.dto';
import { UpdateCourseMediaDto } from './dto/update-course_media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from '../guards/isAdmin.guard';
import { JwtGuard } from '../guards/jwt-auth.guard';

@ApiTags('Kurs Media contenti bo`limi')
@Controller('course-media')
export class CourseMediaController {
  constructor(private readonly courseMediaService: CourseMediaService) {}

  @ApiOperation({summary: 'Kurs mediasini yaratish'})
  @UseGuards(IsAdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createCourseMediaDto: CreateCourseMediaDto, @UploadedFile() file: Express.Multer.File) {
    return this.courseMediaService.create(createCourseMediaDto, file);
  }

  @ApiOperation({summary: 'Barcha medialarni olish'})
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.courseMediaService.findAll();
  }

  @ApiOperation({summary: 'Bitta mediani olish'})
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseMediaService.findOne(+id);
  }

  @ApiOperation({summary: 'Bitta mediani o`zgartirish'})
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: string, @Body() updateCourseMediaDto: UpdateCourseMediaDto, @UploadedFile() file?: Express.Multer.File) {
    return this.courseMediaService.update(+id, updateCourseMediaDto, file);
  }
  
  @ApiOperation({summary: 'Bitta mediani o`chirish'})
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseMediaService.remove(+id);
  }
}

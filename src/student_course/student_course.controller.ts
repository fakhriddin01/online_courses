import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentCourseService } from './student_course.service';
import { CreateStudentCourseDto } from './dto/create-student_course.dto';
import { UpdateStudentCourseDto } from './dto/update-student_course.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Sotib olinga kurslar bo`limi')
@Controller('student-course')
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @ApiOperation({summary: 'Student sotib olgan kurs yaratish'})
  @Post()
  create(@Body() createStudentCourseDto: CreateStudentCourseDto) {
    return this.studentCourseService.create(createStudentCourseDto);
  }

  @ApiOperation({summary: 'Barcha sotib olinga kurslarni olish'})
  @Get()
  findAll() {
    return this.studentCourseService.findAll();
  }

  @ApiOperation({summary: 'Bitta sotib olingan kursi olish'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentCourseService.findOne(+id);
  }

  @ApiOperation({summary: 'Bitta sotib olingan kursni o`zgartirish'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentCourseDto: UpdateStudentCourseDto) {
    return this.studentCourseService.update(+id, updateStudentCourseDto);
  }

  @ApiOperation({summary: 'Bitta sotib olingan kursni o`chirish'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentCourseService.remove(+id);
  }
}

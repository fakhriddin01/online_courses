import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Ustozlar bo`limi')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({summary: 'Ustoz yaratish'})
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({summary: 'Barcha Ustozlarni olish'})
  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @ApiOperation({summary: 'Bitta ustozni olish'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @ApiOperation({summary: 'Bitta ustozni o`zgartirish'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @ApiOperation({summary: 'Bitta ustozni o`chirish'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}

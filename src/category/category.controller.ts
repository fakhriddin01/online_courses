import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from '../guards/isAdmin.guard';
import { JwtGuard } from '../guards/jwt-auth.guard';

@ApiTags('Categoriyalar bo`limi')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({summary: 'Categoriya yaratish'})
  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({summary: 'Barchar Categoriyalarni ko`rish'})
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({summary: 'Bitta Categoriyani ko`rish'})
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @UseGuards(IsAdminGuard)
  @ApiOperation({summary: 'Bitta Categoriyani o`zgartirish'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @UseGuards(IsAdminGuard)
  @ApiOperation({summary: 'Bitta Categoriyani o`chirish'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

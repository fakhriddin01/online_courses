import { Module } from '@nestjs/common';
import { CourseMediaService } from './course_media.service';
import { CourseMediaController } from './course_media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseMedia } from './models/course_media.model';
import { FilesModule } from '../files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([CourseMedia]), FilesModule, JwtModule.register({})],
  controllers: [CourseMediaController],
  providers: [CourseMediaService]
})
export class CourseMediaModule {}

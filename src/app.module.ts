
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize'
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/models/teacher.model';
import { CourseModule } from './course/course.module';
import { CourseMediaModule } from './course_media/course_media.module';
import { FilesModule } from './files/files.module';
import { StudentModule } from './student/student.module';
import { OtpModule } from './otp/otp.module';
import { TokenModule } from './token/token.module';
import { StatusModule } from './status/status.module';
import { StudentCourseModule } from './student_course/student_course.module';
import { Otp } from './otp/models/otp.model';
import { Status } from './status/models/status.model';
import { Student } from './student/models/student.model';
import { StudentCourse } from './student_course/models/student_course.model';
import { Token } from './token/models/token.model';
import { CourseMedia } from './course_media/models/course_media.model';
import { Course } from './course/models/course.model';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [Category, Course, CourseMedia, Otp, Status, Student, StudentCourse, Teacher, Token],
            autoLoadModels: true,
            logging: false
        }),
        CategoryModule,
        TeacherModule,
        CourseModule,
        CourseMediaModule,
        FilesModule,
        StudentModule,
        OtpModule,
        TokenModule,
        StatusModule,
        StudentCourseModule,
        AdminModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}

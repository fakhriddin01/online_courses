import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentCourseDto } from './create-student_course.dto';

export class UpdateStudentCourseDto {
    status_id?: number;
    progress: number;
}

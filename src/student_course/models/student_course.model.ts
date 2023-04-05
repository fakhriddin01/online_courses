import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Student } from "../../student/models/student.model";
import { Status } from "../../status/models/status.model";
import { Course } from "../../course/models/course.model";

interface StudentCourseAttr {
    student_id: number;
    status_id: number;
    course_id: number;
}
@Table({tableName: 'student_course'})
export class StudentCourse extends Model<StudentCourse, StudentCourseAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(()=> Student)
    @Column({
        type:DataType.INTEGER,
    })
    student_id: number;

    @ForeignKey(()=> Status)
    @Column({
        type:DataType.INTEGER,
    })
    status_id: number;

    @ForeignKey(()=> Course)
    @Column({
        type:DataType.INTEGER,
    })
    course_id: number;

    @Column({
        type:DataType.DECIMAL,
        defaultValue: 0
    })
    progress: number;

    @BelongsTo(()=> Course)
    course: Course;
    
    @BelongsTo(()=> Student)
    student: Student;
    
}

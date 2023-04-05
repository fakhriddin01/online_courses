import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../../category/models/category.model";
import { Teacher } from "../../teacher/models/teacher.model";
import { CourseMedia } from "../../course_media/models/course_media.model";
import { StudentCourse } from "../../student_course/models/student_course.model";

interface CourseAttr {
    price: number;
    teacher_id: number;
    info: string;
    category_id: number;
    content: string;
}

@Table({tableName: 'course'})
export class Course extends Model<Course, CourseAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.DECIMAL,
    })
    price: number;

    @Column({
        type:DataType.TEXT,
    })
    info: string;

    @Column({
        type:DataType.STRING,
    })
    content: string;

    @ForeignKey(()=> Category)
    @Column({
        type:DataType.INTEGER,
    })
    category_id: number;

    @ForeignKey(()=> Teacher)
    @Column({
        type:DataType.INTEGER,
    })
    teacher_id: number;

    @BelongsTo(()=> Teacher)
    teacher: Teacher;

    @BelongsTo(()=> Category)
    category: Category;  
    
    @HasMany(()=> CourseMedia)
    media: CourseMedia[];

    @HasMany(()=> StudentCourse)
    student: StudentCourse[];
}

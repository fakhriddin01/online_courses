import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Course } from "../../course/models/course.model";

interface CourseMediaAttr {
    course_id: number;
    name: string;
}

@Table({tableName: "course_media"})
export class CourseMedia extends Model<CourseMedia, CourseMediaAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(()=> Course)
    @Column({
        type:DataType.INTEGER,
    })
    course_id: number;

    @Column({
        type:DataType.STRING,
    })
    name: string;

    @BelongsTo(()=> Course)
    course: Course;
}

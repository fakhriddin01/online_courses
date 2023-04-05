import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Course } from "../../course/models/course.model";


interface TeacherAttr {
    first_name: string;
    last_name: string;
    title: string;
    email: string
}

@Table({tableName: 'teacher'})
export class Teacher extends Model<Teacher, TeacherAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    first_name: string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    last_name: string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    title: string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    email: string;

    @HasMany(()=> Course)
    courses: Course[]
}

import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Course } from "../../course/models/course.model";

interface CategoryAttr {
    name: string;
}

@Table({tableName: 'category'})
export class Category extends Model<Category, CategoryAttr> {
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
    name: string;

    @HasMany(()=> Course)
    courses: Course[]
}

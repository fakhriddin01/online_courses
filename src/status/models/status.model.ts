import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface StatusAttr {
    name: string;
}

@Table({tableName: 'status'})
export class Status extends Model<Status, StatusAttr> {
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

    // @HasMany(()=> Course)
    // courses: Course[]
}

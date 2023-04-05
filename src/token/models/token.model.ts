import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "../../student/models/student.model";

interface TokenAttr {
    student_id: number;
    student_device: string;
    hashed_refresh_token: string;
}

@Table({tableName: 'token'})
export class Token extends Model<Token, TokenAttr>{
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

    @Column({
        type:DataType.STRING,
    })
    student_device: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_refresh_token: string;

    // @BelongsTo(()=> Student)
    // student: Student;
}

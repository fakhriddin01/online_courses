import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Otp } from "../../otp/models/otp.model";
import { Token } from "../../token/models/token.model";
import { StudentCourse } from "../../student_course/models/student_course.model";

interface StudentAttr {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    otp_id: number;
}

@Table({tableName: 'student'})
export class Student extends Model<Student, StudentAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
    })
    first_name: string;

    
    @Column({
        type:DataType.STRING,
    })
    last_name: string;

    @Column({
        type:DataType.STRING,
    })
    email: string;

    @Column({
        type:DataType.STRING,
    })
    phone: string;

    @ForeignKey(()=> Otp)
    @Column({
        type:DataType.INTEGER,
    })
    otp_id: number;

    @HasMany(()=> Token)
    devices: Token[];
    
    @HasMany(()=> StudentCourse)
    courses: StudentCourse[];

    @BelongsTo(()=> Otp)
    otp: Otp;

}

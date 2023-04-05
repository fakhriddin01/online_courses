import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface OtpAttr {
    otp: string;
    expiration: Date;
    verified: boolean;
}

@Table({tableName: 'otp'})
export class Otp extends Model<Otp, OtpAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
    })
    otp: String;

    @Column({
        type:DataType.DATE,
    })
    expiration: Date;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: false
    })
    verified: Boolean;
}

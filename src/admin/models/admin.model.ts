import { Column, DataType, Table, Model, BelongsTo, HasMany, HasOne, ForeignKey } from "sequelize-typescript";

interface AdminAttr {
    name: string;
    login: string;
    hashed_password: string;
    is_active: boolean;
    is_creator: boolean;
    hashed_refresh_token: string;
}

@Table({tableName: 'admin'})
export class Admin extends Model<Admin, AdminAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
    })
    name: string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique: true
    })
    login: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: true
    })
    is_active: boolean;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: false
    })
    is_creator: boolean;


}

import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column
    name: string;
    @Column
    email: string;
    @Column
    phone: string;
    @Column
    avatar: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    text?: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    mapSrc?: string;
    @Column
    password: string;
}

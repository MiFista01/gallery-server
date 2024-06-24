import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Painting extends Model {
    @Column
    title: string;

    @Column
    rusTitle: string;

    @Column
    estTitle: string;

    @Column
    des: string;

    @Column
    rusDes: string;

    @Column
    estDes: string;

    @Column
    imgPath: string;

    @Column
    size: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    price: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    orderCount: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    rating: number;
}

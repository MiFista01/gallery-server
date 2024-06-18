import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class BackgroundImg extends Model {
    @Column
    path: string;

    @Column
    status: boolean;
}

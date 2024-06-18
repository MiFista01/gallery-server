import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class News extends Model {
    @Column
    title: string;

    @Column
    text: string;

    @Column
    poster: string;
}

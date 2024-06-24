import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class News extends Model {
    @Column
    title: string;

    @Column
    rusTitle: string;

    @Column
    estTitle: string;

    @Column
    text: string;

    @Column
    rusText: string;

    @Column
    estText: string;

    @Column
    poster: string;
}

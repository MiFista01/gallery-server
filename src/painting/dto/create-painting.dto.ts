import { IsNumber, IsString } from 'class-validator';

export class CreatePaintingDto {
    @IsString()
    title: string;
    @IsString()
    des: string;
    @IsString()
    size: string;
    @IsNumber()
    price: number;
}

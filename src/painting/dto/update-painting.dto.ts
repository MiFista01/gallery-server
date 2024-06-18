import { PartialType } from '@nestjs/mapped-types';
import { CreatePaintingDto } from './create-painting.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePaintingDto extends PartialType(CreatePaintingDto) {
    @IsNumber()
    id: number;
    @IsString()
    imgPath: string;
}

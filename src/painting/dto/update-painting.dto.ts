import { PartialType } from '@nestjs/mapped-types';
import { CreatePaintingDto } from './create-painting.dto';
import { IsString } from 'class-validator';

export class UpdatePaintingDto extends PartialType(CreatePaintingDto) {
    @IsString()
    imgPath:string
}

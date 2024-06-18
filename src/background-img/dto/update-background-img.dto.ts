import { PartialType } from '@nestjs/mapped-types';
import { CreateBackgroundImgDto } from './create-background-img.dto';

export class UpdateBackgroundImgDto extends PartialType(
    CreateBackgroundImgDto,
) {}

import { IsString } from "class-validator"

export class CreateBackgroundImgDto {
    @IsString()
    path: string
    @IsString()
    status: string
}

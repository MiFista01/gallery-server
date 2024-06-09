import { IsOptional, IsString } from "class-validator";

export class CreateNewsDto {
    @IsString()
    title:String

    @IsString()
    text:string

    @IsString()
    @IsOptional()
    poster?:string
}

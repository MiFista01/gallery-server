import { IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    name: string
    @IsString()
    email: string
    @IsString()
    avatar: string
    @IsString()
    mapSrc?: string
    @IsString()
    password: string
}

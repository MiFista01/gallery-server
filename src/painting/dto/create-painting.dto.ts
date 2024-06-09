import { IsNumber, IsString } from "class-validator"

export class CreatePaintingDto {
    @IsString()
    title:string
    @IsString()
    des:string
    @IsNumber()
    price:number
}

import { Transform } from 'class-transformer'
import { IsEmail, MinLength, IsString } from 'class-validator'

export class CreateUserDto {
    
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    password: string;
}

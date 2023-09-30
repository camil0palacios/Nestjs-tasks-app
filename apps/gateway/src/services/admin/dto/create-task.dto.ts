import { IsString, IsNumber, IsOptional, IsNotEmpty } from "class-validator";


export class CreateTaskDto {
    
    @IsString()
    title: string;
    
    @IsString()
    description: string;
    
    @IsString()
    status: string;
    
}

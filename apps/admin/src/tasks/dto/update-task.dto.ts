import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  
  @IsNumber()
  task_id: number;
  
  @IsString()
  @IsOptional()
  title?: string;
  
  @IsString()
  @IsOptional()
  description?: string;
  
  @IsString()
  @IsOptional()
  status?: string;
  
  @IsNumber()
  user_id: number;

}

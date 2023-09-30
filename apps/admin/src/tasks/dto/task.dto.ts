import { IsNumber } from "class-validator";

export class TaskDto {
    
    @IsNumber()
    task_id: number;

    @IsNumber()
    user_id: number;

}

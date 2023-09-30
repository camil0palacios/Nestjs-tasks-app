import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';

@Controller()
export class TasksController {

constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('find_tasks')
  findAll(@Payload('user_id') userId: number) {
    return this.tasksService.findAll(userId);
  }

  @MessagePattern('find_task')
  findOne(@Payload() taskDto: TaskDto) {
    return this.tasksService.findOne(taskDto);
  }

  @MessagePattern('create_task')
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('update_task')
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto);
  }

  @MessagePattern('remove_task')
  remove(@Payload() taskDto: TaskDto) {
    return this.tasksService.remove(taskDto);
  }
}

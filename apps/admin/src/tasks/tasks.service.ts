import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';

import { 
  TASK_CREATE_ERROR, 
  TASK_DELETED, 
  TASK_DELETED_ERROR, 
  TASK_FIND_ERROR,
  TASK_UPDATED, 
  TASK_UPDATE_ERROR 
} from 'libs/constants/tasks.constants';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './entities/task.entity'
import { TryCatchDecorator } from 'libs/decorators/try-catch.decorator';
import { CreateTaskCommand, RemoveTaskCommand, UpdateTaskCommand } from './tasks.commands';
import { FindAllTasksQuery, FindOneTaskQuery } from './tasks.queries';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}
  
  @TryCatchDecorator(TASK_CREATE_ERROR)
  async create(createTaskDto: CreateTaskDto) {
    const { title, description, status, user_id } = createTaskDto
    const command = new CreateTaskCommand(
      title,
      description,
      status, 
      user_id
    );
    return await this.commandBus.execute(command);
  }

  @TryCatchDecorator()
  async findAll(userId: number) {
    const query = new FindAllTasksQuery(userId);
    const tasks = await this.queryBus.execute(query);
    return { tasks };
  }

  @TryCatchDecorator(TASK_FIND_ERROR)
  async findOne(taskDto: TaskDto) {
    
    const { task_id, user_id } = taskDto;
    
    const query = new FindOneTaskQuery(task_id, user_id);
    const task = await this.queryBus.execute(query);
  
    if (!task) throw new Error(TASK_FIND_ERROR);
    
    return { task };
  }

  @TryCatchDecorator(TASK_UPDATE_ERROR)
  async update(updateTaskDto: UpdateTaskDto) {
    const { task_id, user_id, title, description, status } = updateTaskDto;
    
    const { task } = await this.findOne({ task_id, user_id });
    if (!task) throw new Error(TASK_FIND_ERROR);
    
    const command = new UpdateTaskCommand(
      task_id,
      title,
      description,
      status,
    );
    await this.commandBus.execute(command);
    
    return { message: TASK_UPDATED };
  }

  @TryCatchDecorator(TASK_DELETED_ERROR)
  async remove(taskDto: TaskDto) {
    const { task_id, user_id } = taskDto;
    
    const { task } = await this.findOne({ task_id, user_id });
    if (!task) throw new Error(TASK_FIND_ERROR);
    
    const command = new RemoveTaskCommand(task_id, user_id);
    await this.commandBus.execute(command);

    return { message: TASK_DELETED };
  }
}

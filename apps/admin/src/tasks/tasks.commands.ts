import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

export class CreateTaskCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly status: string,
    public readonly user_id: number
  ) {}
}

export class UpdateTaskCommand {
  constructor(
    public readonly task_id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly status: string,    
  ) {}
}

export class RemoveTaskCommand {
  constructor ( 
    public readonly task_id: number,
    public readonly user_id: number,
  ) {}
}

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>
  ) {}

  async execute(taskCreateCommand: CreateTaskCommand) {
    return this.tasksRepo.save(taskCreateCommand);
  }
}

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>
  ) {}

  async execute(updateTaskCommand: UpdateTaskCommand) {
    const { task_id, title, description, status} = updateTaskCommand;
    await this.tasksRepo.update(task_id, {
      title,
      description,
      status
    });
  }
}

@CommandHandler(RemoveTaskCommand)
export class RemoveTaskHandler implements ICommandHandler<RemoveTaskCommand> {
  
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>
  ) {}

  async execute(removeTaskCommand: RemoveTaskCommand) {
    const { task_id, user_id } = removeTaskCommand;
    await this.tasksRepo.softDelete({  id: task_id, user_id: user_id });
  }
}
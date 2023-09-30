import { InjectRepository } from '@nestjs/typeorm';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

export class FindAllTasksQuery {
  constructor (
    public readonly user_id: number
  ) {}
}

export class FindOneTaskQuery {
  constructor (
    public readonly task_id: number,
    public readonly user_id: number
  ) {}
}

@QueryHandler(FindAllTasksQuery)
export class FindAllTasksHandler implements IQueryHandler<FindAllTasksQuery> {
  
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>
  ) {}

  async execute(findAllTasksQuery: FindAllTasksQuery) {
    const { user_id } = findAllTasksQuery;
  
    const tasks = await this.tasksRepo
      .createQueryBuilder("tasks")
      .where("tasks.user_id = :user_id", { user_id })
      .getMany();
    
      return tasks;
  }
}

@QueryHandler(FindOneTaskQuery)
export class FindOneTaskHandler implements IQueryHandler<FindOneTaskQuery> {
  
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>
  ) {}

  async execute(findOneTaskQuery: FindOneTaskQuery) {
    const { task_id, user_id } = findOneTaskQuery;
    
    const task = await this.tasksRepo
      .createQueryBuilder("tasks")
      .where("tasks.id = :task_id and tasks.user_id = :user_id", { task_id, user_id })
      .getOne();
    
    return task;
  }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { UsersModule } from '../users/users.module';
import { CreateTaskHandler, UpdateTaskHandler, RemoveTaskHandler } from './tasks.commands';
import { FindAllTasksHandler, FindOneTaskHandler } from './tasks.queries';

const commandHandlers = [CreateTaskHandler, UpdateTaskHandler, RemoveTaskHandler];
const queryHandlers = [FindAllTasksHandler, FindOneTaskHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule, CqrsModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    ...commandHandlers,
    ...queryHandlers
  ],
})
export class TasksModule {}

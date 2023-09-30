import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './users.commands'; 
import { FindByEmailHandler } from './users.queries';

const commandHandlers = [CreateUserHandler];
const queryHandlers = [FindByEmailHandler];

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...commandHandlers,
    ...queryHandlers
  ]
})
export class UsersModule {}

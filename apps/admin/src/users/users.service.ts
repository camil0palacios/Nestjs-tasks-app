import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { USER_CREATE_ERROR, USER_FIND_ERROR } from 'libs/constants/users.constants';
import { TryCatchDecorator } from 'libs/decorators/try-catch.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from './users.commands';
import { FindByEmailQuery } from './users.queries';

@Injectable()
export class UsersService {

  constructor (
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @TryCatchDecorator(USER_CREATE_ERROR)
  async create({name, email, password}: CreateUserDto) {
    const command = new CreateUserCommand(name, email, password);
    return await this.commandBus.execute(command);
  }

  @TryCatchDecorator(USER_FIND_ERROR)
  async findByEmail(email: string) {
    const query = new FindByEmailQuery(email);
    const user = await this.queryBus.execute(query);
    return { user };
  }

}

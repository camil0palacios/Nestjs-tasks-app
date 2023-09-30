import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async execute(createUserCommand: CreateUserCommand) {
    return await this.userRepo.save(createUserCommand);
  }
}
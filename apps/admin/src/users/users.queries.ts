import { InjectRepository } from '@nestjs/typeorm';
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class FindByEmailQuery {
  constructor(
    public readonly email: string,
  ) {}
}

@QueryHandler(FindByEmailQuery)
export class FindByEmailHandler implements IQueryHandler<FindByEmailQuery> {
  
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async execute(findByEmailQuery: FindByEmailQuery) {
    const { email } = findByEmailQuery;
    return await this.userRepo.findOneBy({ email });
  }
}
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @MessagePattern('find_by_email')
  findByEmail(@Payload('email') email: string) {
    return this.usersService.findByEmail(email);
  }

}

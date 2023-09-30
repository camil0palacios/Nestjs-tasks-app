import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as bcryptjs from 'bcryptjs';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import {
  AUTH_USER_EXISTS,
  AUTH_EMAIL_DONT_EXISTS, 
  AUTH_PASSWORD_WRONG,
} from 'libs/constants/auth.constants';
import { generateResponse } from 'libs/utils/generate-response';

@Injectable()
export class AuthService {

  constructor(
    @Inject('ADMIN_SERVICE') private clientAdmin: ClientProxy,
    private readonly jwtService: JwtService
  ) { }

  async register(registerDto: RegisterDto) {

    const user = await firstValueFrom(this.clientAdmin.send('find_by_email', { email: registerDto.email }));
    if (user?.user) {
      throw new BadRequestException(AUTH_USER_EXISTS);
    }

    const hashPassword = await bcryptjs.hash(registerDto.password, 10);
    registerDto.password = hashPassword;

    const response = await firstValueFrom(this.clientAdmin.send('create_user', registerDto));
    return generateResponse(response)
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const response = await firstValueFrom(this.clientAdmin.send('find_by_email', { email: email }));
    if (response?.error) throw new BadRequestException(AUTH_EMAIL_DONT_EXISTS);

    const user = response.user;
    const passwordValid = await bcryptjs.compare(password, user.password);
    if (!passwordValid) throw new BadRequestException(AUTH_PASSWORD_WRONG);

    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      "email": user.email,
      "token": token
    };
  }
}

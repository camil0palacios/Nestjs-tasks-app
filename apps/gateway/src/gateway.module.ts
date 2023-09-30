import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AdminModule } from './services/admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminModule, AuthModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

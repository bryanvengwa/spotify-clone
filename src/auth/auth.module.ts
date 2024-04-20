import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UsersModule, JwtModule.register({ secret: 'fdafasf' })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

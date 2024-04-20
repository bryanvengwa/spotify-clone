import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { jwtStrategy } from './jwt-strategy';
@Module({
  imports: [UsersModule, JwtModule.register({ secret: authConstants.secret, signOptions : {expiresIn : '1d'} })],
  providers: [AuthService , jwtStrategy ],
  controllers: [AuthController],
})
export class AuthModule {}

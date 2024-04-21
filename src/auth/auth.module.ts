import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { jwtStrategy } from './jwt-strategy';
import { ArtistsService } from 'src/artists/artists.service';
import { ArtistsModule } from 'src/artists/artists.module';
import { Artist } from 'src/artists/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [UsersModule,ArtistsModule,TypeOrmModule.forFeature([Artist]), JwtModule.register({ secret: authConstants.secret,  signOptions : {expiresIn : '1d'} })],
  providers: [AuthService , jwtStrategy , ArtistsService],
  controllers: [AuthController],
})
export class AuthModule {}

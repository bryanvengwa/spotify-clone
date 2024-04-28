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
import { ApiKeyStrategy } from './apiKeyStrategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TypeOrmModule.forFeature([Artist]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, jwtStrategy, ArtistsService, ApiKeyStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

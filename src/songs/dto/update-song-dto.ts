import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly artist: string[];
  @IsOptional()
  @IsDateString()
  readonly releaseDate: Date;

  @IsOptional()
  @IsMilitaryTime()
  duration: Date;

  @IsOptional()
  @IsString()
  lyrics: string;
}

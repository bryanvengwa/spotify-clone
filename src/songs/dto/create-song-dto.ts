import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsMilitaryTime,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  @IsArray()
  readonly artist: string[];
  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: Date;
  @IsNotEmpty()
  @IsMilitaryTime()
  duration: Date;
}

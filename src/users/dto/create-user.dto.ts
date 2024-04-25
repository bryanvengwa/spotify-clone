import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";
export class CreateUserDTO {
    
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  @Column({unique: true})
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
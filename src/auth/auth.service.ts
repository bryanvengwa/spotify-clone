import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.entity";
import { JwtService } from "@nestjs/jwt";
import * as speakeasy from 'speakeasy';
import { Enable2FAType } from "./types";
import { UpdateResult } from "typeorm";
@Injectable()
export class AuthService {
  constructor(private userService: UsersService , private jwtService : JwtService) {}

async login(loginDTO: LoginDTO): Promise<{ accessToken: string }>{
const user = await this.userService.findOne(loginDTO); // 1.
 const passwordMatched = await bcrypt.compare(
      loginDTO.password,
user.password
);
if (passwordMatched) {
    delete user.password;
 
    // Sends JWT Token back in the response
    const payload = { email: user.email, sub: user.id };
    return {
        accessToken: this.jwtService.sign(payload),
    };
    
} else {
throw new UnauthorizedException("Password does not match"); // 5.
} 

}

async enable2FA(userId: number) : Promise<Enable2FAType> {
  const user = await this.userService.findById( userId ); //1
  if (user.enable2FA) { //2
  return { secret: user.twoFASecret };
  }
  const secret = speakeasy.generateSecret(); //3
  console.log(secret);
  user.twoFASecret = secret.base32; //4
  await this.userService.updateSecretKey(user.id, user.twoFASecret); //5 return { secret: user.twoFASecret }; //6
  }
  async validate2FAToken(
    userId: number,
    token: string,
    ): Promise<{ verified: boolean }> {
    try {
    // find the user on the based on id
    const user = await this.userService.findById(userId);
    // extract his 2FA secret
    // verify the secret with a token by calling the speakeasy verify method
    const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    token: token,
    encoding: 'base32',
    });
    // if validated then sends the json web token in the response
    if (verified) {
    return { verified: true };
    } else {
    return { verified: false };
    }
    } catch (err) {
    throw new UnauthorizedException('Error verifying token');
    }
    }
    async disable2FA(userId:number):Promise<UpdateResult>{
      return this.userService.disable2FA(userId)
    }
    

}
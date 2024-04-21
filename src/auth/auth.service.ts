import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.entity";
import { JwtService } from "@nestjs/jwt";
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

}
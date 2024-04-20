import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.entity";
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

async login(loginDTO: LoginDTO): Promise<User>{
const user = await this.userService.findOne(loginDTO); // 1.
 const passwordMatched = await bcrypt.compare(
      loginDTO.password,
user.password
);
if (passwordMatched) {
delete user.password; // 4. 
return user;
} else {
throw new UnauthorizedException("Password does not match"); // 5.
} 
return;
}

}
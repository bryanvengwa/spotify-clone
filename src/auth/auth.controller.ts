import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(private userService: UsersService, private authService : AuthService) {}
  @Post("signup")
  signup(
@Body()
    userDTO: CreateUserDTO
  ): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login') login(
    @Body()
    loginDTO: LoginDTO, ){
      
    return this.authService.login(loginDTO);
    }
    

}

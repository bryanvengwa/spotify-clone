
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import * as bcrypt from "bcryptjs";
import { CreateUserDTO } from "./dto/create-user.dto";
@Injectable()
export class UsersService {
constructor(
@InjectRepository(User)
private userRepository: Repository<User> // 1.
) {}
async create(userDTO: CreateUserDTO): Promise<User> {
const salt = await bcrypt.genSalt(); // 2.
userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3. 
const user = await this.userRepository.save(userDTO); // 4.
delete user.password; // 5.
return user; // 6. }
}
async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
    throw new UnauthorizedException('Could not find user');
    }
    return user;
   }
   async findById(id : number){
    return await this.userRepository.findOneBy({ id: id });
   }
   
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuid4 } from 'uuid'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // 1.
  ) {}
  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt(); // 2.
    userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3.
    userDTO.apiKey = uuid4()
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
  async findById(id: number) {
    return await this.userRepository.findOneBy({ id: id });
  }
  async updateSecretKey(id: number, secret: string) :Promise<UpdateResult> {
   return await this.userRepository.update( {id: id}, { twoFASecret: secret , enable2FA : true});
  }
  async disable2FA(id:number):Promise<UpdateResult> {
    return this.userRepository.update({id:id}, {enable2FA:false , twoFASecret: null})

  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as argon2 from "argon2"
import * as fs from "fs"
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly user: typeof User
  ) { }
  async initUser() {
    this.user.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: "user",
        email:"example@gmail.com",
        avatar:"",
        password: await argon2.hash("qwerty")
      }
    })
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) { 
    let user = await this.user.findByPk(id, {
      attributes: {
        exclude: ['password']
     }
    })
    return user
  }

  async update(id: number, body:UpdateUserDto) {
    const user = await this.user.findByPk(id)
    if(user){
      if(!body.avatar){
        delete body.avatar
      }else{
        try {
          fs.unlinkSync(`public/imgs/avatar/${user.avatar}`)
        } catch (error) {
          
        }
      }
      if(body.password){
        body.password = await argon2.hash(body.password)
      }
      return await user.update(body)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

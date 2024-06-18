import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as argon2 from 'argon2';
import * as fs from 'fs';
import { Response } from 'express';
import { Op } from 'sequelize';
import { JwtService } from 'src/services/jwt.service';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly user: typeof User,
        private jwt: JwtService,
    ) {}
    async initUser() {
        this.user.findOrCreate({
            where: { id: 1 },
            defaults: {
                name: 'user',
                email: 'example@gmail.com',
                avatar: '',
                password: await argon2.hash('qwerty'),
            },
        });
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
                exclude: ['password'],
            },
        });
        return user;
    }

    async update(id: number, body: UpdateUserDto) {
        const user = await this.user.findByPk(id);
        if (user) {
            if (!body.avatar) {
                delete body.avatar;
            } else {
                try {
                    fs.unlinkSync(`public/imgs/avatar/${user.avatar}`);
                } catch (error) {}
            }
            if (body.password && body.password != '' && body.password != 'undefined') {
                body.password = await argon2.hash(body.password);
            }
            return await user.update(body);
        }
    }
    async findOneByPayload(where: any) {
        return await this.user.findOne({ where });
    }
    remove(id: number) {
        return `This action removes a #${id} user`;
    }
    async login(res:Response, body:any){
        const user = await this.findOneByPayload({
            [Op.or]: [{ name: body.user }, { email: body.user }],
        });
        if (!user) {
            res.status(403).send({ field: 1 });
            return null;
        }
        const passwordStatus = await argon2.verify(
            user.password,
            body.password,
        );
        if (!passwordStatus) {
            res.status(403).send({ field: 2 });
            return null;
        }
        const token = this.jwt.generateToken(
            { sub: user.id, username: user.name },
            process.env.TOKEN_EXPIRATION,
        );
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({ status: true });
        return null;
    }
}

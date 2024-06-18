import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from 'src/services/jwt.service';

@Module({
    imports: [SequelizeModule.forFeature([User]), JwtModule],
    controllers: [UserController],
    providers: [UserService, JwtService],
})
export class UserModule {}

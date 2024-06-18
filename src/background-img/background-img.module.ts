import { Module } from '@nestjs/common';
import { BackgroundImgService } from './background-img.service';
import { BackgroundImgController } from './background-img.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BackgroundImg } from './entities/background-img.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from 'src/services/jwt.service';

@Module({
    imports: [SequelizeModule.forFeature([BackgroundImg]), JwtModule],
    controllers: [BackgroundImgController],
    providers: [BackgroundImgService, JwtService],
})
export class BackgroundImgModule {}

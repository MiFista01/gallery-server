import { Module } from '@nestjs/common';
import { BackgroundImgService } from './background-img.service';
import { BackgroundImgController } from './background-img.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BackgroundImg } from './entities/background-img.entity';

@Module({
  imports:[
    SequelizeModule.forFeature([BackgroundImg]),
  ],
  controllers: [BackgroundImgController],
  providers: [BackgroundImgService],
})
export class BackgroundImgModule {}

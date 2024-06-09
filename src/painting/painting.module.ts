import { Module } from '@nestjs/common';
import { PaintingService } from './painting.service';
import { PaintingController } from './painting.controller';
import { Painting } from './entities/painting.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[
    SequelizeModule.forFeature([Painting]),
  ],
  controllers: [PaintingController],
  providers: [PaintingService],
})
export class PaintingModule {}

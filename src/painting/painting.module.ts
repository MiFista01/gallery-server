import { Module } from '@nestjs/common';
import { PaintingService } from './painting.service';
import { PaintingController } from './painting.controller';
import { Painting } from './entities/painting.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from 'src/services/jwt.service';

@Module({
    imports: [SequelizeModule.forFeature([Painting]), JwtModule],
    controllers: [PaintingController],
    providers: [PaintingService, JwtService],
})
export class PaintingModule {}

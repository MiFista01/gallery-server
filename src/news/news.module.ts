import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from 'src/services/jwt.service';

@Module({
    imports: [SequelizeModule.forFeature([News]), JwtModule],
    controllers: [NewsController],
    providers: [NewsService, JwtService],
})
export class NewsModule {}

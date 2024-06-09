import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[
    SequelizeModule.forFeature([News]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}

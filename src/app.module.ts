import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Dialect } from 'sequelize';
import * as dotenv from "dotenv";
import { SequelizeModule } from '@nestjs/sequelize';
import { BackgroundImgModule } from './background-img/background-img.module';
import { BackgroundImg } from './background-img/entities/background-img.entity';
import { PaintingModule } from './painting/painting.module';
import { Painting } from './painting/entities/painting.entity';
import { NewsModule } from './news/news.module';
import { News } from './news/entities/news.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
dotenv.config();
@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: `/${process.env.API_NAME}/static`,
  }),
  SequelizeModule.forRootAsync({
    useFactory: () => ({
      dialect: process.env.DB_TYPE as Dialect,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_PRODUCTION,
      synchronize: true,
      autoLoadModels: true,
      models: [BackgroundImg, Painting, News, User],
      sync: { force: false, alter: true }
    })
  }),
  BackgroundImgModule,
  PaintingModule,
  NewsModule,
  UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

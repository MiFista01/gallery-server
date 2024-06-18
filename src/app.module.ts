import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';
import { SequelizeModule } from '@nestjs/sequelize';
import { BackgroundImgModule } from './background-img/background-img.module';
import { BackgroundImg } from './background-img/entities/background-img.entity';
import { PaintingModule } from './painting/painting.module';
import { Painting } from './painting/entities/painting.entity';
import { NewsModule } from './news/news.module';
import { News } from './news/entities/news.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtService } from './services/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path'; 
dotenv.config();
@Module({
    imports: [
        ServeStaticModule.forRoot({
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
                sync: { force: false, alter: true },
            }),
        }),
        MailerModule.forRoot({
            transport: {
                service: process.env.MAIL_SERVICE,
                port: parseInt(process.env.MAIL_PORT),
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            },
            defaults: {
                from: `<${process.env.MAIL_USER}>`,
            },
            template: {
                dir: path.resolve(__dirname, '../templates'),
                adapter: new EjsAdapter(),
            },
        }),
        BackgroundImgModule,
        PaintingModule,
        NewsModule,
        UserModule,
        JwtModule,
    ],
    controllers: [AppController],
    providers: [AppService, JwtService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { UserService } from './user/user.service';
dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(process.env.API_NAME);
    global.appRoot = __dirname;
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.FRONT_URL, // Разрешить запросы от этого источника
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.get(UserService).initUser();
    await app.listen(4000);
}
bootstrap();

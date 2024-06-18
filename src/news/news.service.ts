import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News)
        private readonly news: typeof News,
    ) {}
    async create(createNewsDto: CreateNewsDto) {
        console.log(createNewsDto);
        return await this.news.create({ ...createNewsDto });
    }

    async findAll(options: any = {}) {
        return await this.news.findAll(options);
    }

    async findOne(id: number) {
        return await this.news.findByPk(id);
    }

    async update(id: number, updateNewsDto: UpdateNewsDto) {
        const news = await this.news.findByPk(id);
        if (news) {
            if (updateNewsDto.poster) {
                if (fs.existsSync(`public/imgs/news/${news.poster}`)) {
                    await fs.promises.unlink(`public/imgs/news/${news.poster}`);
                }
            }
            await news.update({ ...updateNewsDto });
            await news.save();
            return news;
        }
        return false;
    }

    async remove(id: number) {
        const news = await this.news.findByPk(id);
        if (news) {
            if (
                news.poster &&
                fs.existsSync(`public/imgs/news/${news.poster}`)
            ) {
                fs.unlinkSync(`public/imgs/news/${news.poster}`);
            }
            await news.destroy();
            return true;
        }
        return false;
    }
}

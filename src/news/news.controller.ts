import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/decorators/public.decorator';
@UseGuards(AuthGuard)
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('uploadImage', {
            storage: diskStorage({
                destination: 'public/imgs/news',
                filename: async (req, file, callback) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return callback(
                        null,
                        `${randomName}${extname(file.originalname)}`,
                    );
                },
            }),
        }),
    )
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createNewsDto: CreateNewsDto,
    ) {
        file ? (createNewsDto.poster = file.filename) : null;
        return this.newsService.create(createNewsDto);
    }
    @Public()
    @Get()
    async findAll() {
        return await this.newsService.findAll();
    }
    @Public()
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.newsService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('uploadImage', {
            storage: diskStorage({
                destination: 'public/imgs/news',
                filename: async (req, file, callback) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return callback(
                        null,
                        `${randomName}${extname(file.originalname)}`,
                    );
                },
            }),
        }),
    )
    update(
        @Param('id') id: number,
        @Body() updateNewsDto: UpdateNewsDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        file ? (updateNewsDto.poster = file.filename) : null;
        return this.newsService.update(id, updateNewsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.newsService.remove(id);
    }
}

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    UseGuards,
} from '@nestjs/common';
import { PaintingService } from './painting.service';
import { CreatePaintingDto } from './dto/create-painting.dto';
import { UpdatePaintingDto } from './dto/update-painting.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/decorators/public.decorator';
interface Order {
    name: string;
    lastName: string;
    address: string;
    email: string;
    zip: string;
    city: string;
    phone: string;
    wishes: string;
}
interface FullOrder {
    order: Order;
    painting: UpdatePaintingDto;
}
@UseGuards(AuthGuard)
@Controller('painting')
export class PaintingController {
    constructor(private readonly paintingService: PaintingService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('uploadImage', {
            storage: diskStorage({
                destination: 'public/imgs/paintings',
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
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createPaintingDto: CreatePaintingDto,
    ) {
        return await this.paintingService.create(
            createPaintingDto,
            file.filename,
        );
    }
    @Public()
    @Get('last-added')
    async findLastAdded() {
        return await this.paintingService.findAll({
            order: [['id', 'DESC']],
            limit: 4,
        });
    }
    @Public()
    @Get('popular')
    async findMostPopular() {
        return await this.paintingService.findAll({
            order: [['orderCount', 'DESC']],
            limit: 4,
        });
    }
    @Public()
    @Get()
    findAll() {
        return this.paintingService.findAll();
    }
    @Public()
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.paintingService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('uploadImage', {
            storage: diskStorage({
                destination: 'public/imgs/paintings',
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
    async update(
        @Param('id') id: number,
        @Body() updatePaintingDto: UpdatePaintingDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        file ? (updatePaintingDto.imgPath = file.filename) : null;
        return await this.paintingService.update(id, updatePaintingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.paintingService.remove(id);
    }

    @Public()
    @Post('order')
    async order(@Body() body: FullOrder) {
        const result = await this.paintingService.sendOrder(body);
        return { status: result[0], message: result[1] };
    }
}

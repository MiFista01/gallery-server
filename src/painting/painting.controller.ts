import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PaintingService } from './painting.service';
import { CreatePaintingDto } from './dto/create-painting.dto';
import { UpdatePaintingDto } from './dto/update-painting.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('painting')
export class PaintingController {
  constructor(private readonly paintingService: PaintingService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('uploadImage', {
      storage: diskStorage({
        destination: "public/imgs/paintings",
        filename: async (req, file, callback) => {
          const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPaintingDto: CreatePaintingDto
  ) {
    return await this.paintingService.create(createPaintingDto, file.filename);
  }

  @Get("last-added")
  async findLastAdded() {
    return await this.paintingService.findAll({order: [['id', 'DESC']], limit: 4});
  }

  @Get("popular")
  async findMostPopular() {
    return await this.paintingService.findAll({order: [['orderCount', 'DESC']], limit: 4});
  }

  @Get()
  findAll() {
    return this.paintingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paintingService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('uploadImage', {
      storage: diskStorage({
        destination: "public/imgs/paintings",
        filename: async (req, file, callback) => {
          const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() updatePaintingDto: UpdatePaintingDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    file ? updatePaintingDto.imgPath =  file.filename : null;
    return await this.paintingService.update(id, updatePaintingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paintingService.remove(+id);
  }
}

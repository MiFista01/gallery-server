import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BackgroundImgService } from './background-img.service';
import { UpdateBackgroundImgDto } from './dto/update-background-img.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('background-img')
export class BackgroundImgController {
  constructor(private readonly backgroundImgService: BackgroundImgService) { }
  @Post()
  @UseInterceptors(
    FileInterceptor('uploadImage', {
      storage: diskStorage({
        destination: "public/imgs/bg",
        filename: async (req, file, callback) => {
          const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    return await this.backgroundImgService.create(file);
  }

  @Get()
  findAll() {
    return this.backgroundImgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.backgroundImgService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBackgroundImgDto: UpdateBackgroundImgDto) {
    return this.backgroundImgService.update(id, updateBackgroundImgDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.backgroundImgService.remove(id);
  }
}

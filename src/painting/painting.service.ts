import { Injectable } from '@nestjs/common';
import { CreatePaintingDto } from './dto/create-painting.dto';
import { UpdatePaintingDto } from './dto/update-painting.dto';
import { Painting } from './entities/painting.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from "fs"
@Injectable()
export class PaintingService {
  constructor(
    @InjectModel(Painting)
    private readonly painting: typeof Painting
  ) { }
  async create(createPaintingDto: CreatePaintingDto, fileName: string) {
    return await this.painting.create({ ...createPaintingDto, imgPath: fileName })
  }

  async findAll(options: any = {}) {
    return await this.painting.findAll(options)
  }

  async findOne(id: number) {
    return await this.painting.findByPk(id)
  }

  async update(id: number, updatePaintingDto: UpdatePaintingDto) {
    
    const painting = await this.painting.findByPk(id)
    if (painting) {
      if (updatePaintingDto.imgPath) {
        if(fs.existsSync(`public/imgs/paintings/${painting.imgPath}`)){
          await fs.promises.unlink(`public/imgs/paintings/${painting.imgPath}`)
        }
      }
      await painting.update({ ...updatePaintingDto });
      await painting.save();
      return painting
    }
    return false
  }

  async remove(id: number) {
    const painting = await this.painting.findByPk(id)
    if(painting){
      if(fs.existsSync(`public/imgs/news/${painting.imgPath}`)){
        fs.unlinkSync(`public/imgs/news/${painting.imgPath}`)
      }
      await painting.destroy()
      return true
    }
    return false
  }
}

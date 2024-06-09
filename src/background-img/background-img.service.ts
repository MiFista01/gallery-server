import { Injectable } from '@nestjs/common';
import { UpdateBackgroundImgDto } from './dto/update-background-img.dto';
import { BackgroundImg } from './entities/background-img.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from "fs"
@Injectable()
export class BackgroundImgService {
  constructor(
    @InjectModel(BackgroundImg)
    private readonly backgroundImg : typeof BackgroundImg
  ) { }
  async create(file: Express.Multer.File) {
    return await this.backgroundImg.create({path:file.filename, status:false})
  }

  findAll(where?:any) {
    return this.backgroundImg.findAll({where})
  }

  async findOne(id: number) {
    return await this.backgroundImg.findByPk(id)
  }

  async update(id: number, updateBackgroundImgDto: UpdateBackgroundImgDto) {
    return await this.backgroundImg.update({status: updateBackgroundImgDto.status}, {where:{id}})
  }

  async remove(id: number) {
    const bg = await this.backgroundImg.findByPk(id)
    if(bg){
      fs.promises.unlink(`public/imgs/bg/${bg.path}`)
      this.backgroundImg.destroy({where:{id}})
    }
  }
}

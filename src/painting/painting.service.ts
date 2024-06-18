import { Injectable } from '@nestjs/common';
import { CreatePaintingDto } from './dto/create-painting.dto';
import { UpdatePaintingDto } from './dto/update-painting.dto';
import { Painting } from './entities/painting.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';
import * as path from 'path';
import { MailerService } from '@nestjs-modules/mailer';
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
@Injectable()
export class PaintingService {
    constructor(
        @InjectModel(Painting)
        private readonly painting: typeof Painting,
        private readonly mailerService: MailerService,
    ) {}
    async create(createPaintingDto: CreatePaintingDto, fileName: string) {
        return await this.painting.create({
            ...createPaintingDto,
            imgPath: fileName,
        });
    }

    async findAll(options: any = {}) {
        return await this.painting.findAll(options);
    }

    async findOne(id: number) {
        return await this.painting.findByPk(id);
    }

    async update(id: number, updatePaintingDto: UpdatePaintingDto) {
        console.log(updatePaintingDto);
        const painting = await this.painting.findByPk(id);
        if (painting) {
            if (updatePaintingDto.imgPath) {
                if (
                    fs.existsSync(`public/imgs/paintings/${painting.imgPath}`)
                ) {
                    await fs.promises.unlink(
                        `public/imgs/paintings/${painting.imgPath}`,
                    );
                }
            }
            await painting.update({ ...updatePaintingDto });
            await painting.save();
            return painting;
        }
        return false;
    }

    async remove(id: number) {
        const painting = await this.painting.findByPk(id);
        if (painting) {
            if (fs.existsSync(`public/imgs/news/${painting.imgPath}`)) {
                fs.unlinkSync(`public/imgs/news/${painting.imgPath}`);
            }
            await painting.destroy();
            return true;
        }
        return false;
    }
    async sendOrder(body: FullOrder) {
        for (let i of Object.keys(body.order) as (keyof Order)[]) {
            if (!body.order[i] && i != 'wishes') {
                return [false, `Sa ei täitnud välja nime "${i}" all`];
            }
        }
        const painting = await this.painting.findByPk(body.painting.id);
        if (!painting) {
            return [false, `Maali meie andmebaasist ei leitud`];
        }
        await this.mailerService.sendMail({
            to: process.env.MAIL_USER,
            subject: `Maali pealkirjale "${body.painting.title}" on tehtud tellimus`,
            template: 'confirm',
            context: {
                ...body,
            },
        });
        await painting.update({ orderCount: painting.orderCount++ });
        await painting.save();
        return [true, 'Tellimus edukalt vastu võetud'];
    }
}

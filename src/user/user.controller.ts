import { Controller, Get, Post, Body, Patch, Param, UseInterceptors, UploadedFile, Res, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/decorators/public.decorator';
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,

    ) { }
    @Get('check')
    async checkUser() {
        return true;
    }
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('uploadImage', {
            storage: diskStorage({
                destination: 'public/imgs/avatar',
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
        @Body() updateUserDto: UpdateUserDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        file ? (updateUserDto.avatar = file.filename) : null;
        return this.userService.update(id, updateUserDto);
    }
    @Public()
    @Post('login')
    async login(@Body() body: any, @Res() res: Response) {
        return await this.userService.login(res, body)
    }
    @Post('logout')
    async logout(@Res() res: Response) {
        res.cookie('token', '', { expires: new Date(0), httpOnly: true });
        res.status(200).send({ message: 'Logout successful.' });
    }
}

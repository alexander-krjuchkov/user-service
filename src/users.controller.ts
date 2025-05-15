import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('create')
    async create(@Body() dto: CreateUserDto) {
        const id = await this.usersService.create(dto);
        return { success: true, result: { id } };
    }

    @Get('get')
    async getAll(@Query('role') role: string) {
        const users = await this.usersService.find(undefined, role);
        return { success: true, result: { users } };
    }

    @Get('get/:id')
    async getOne(@Param('id') id: string, @Query('role') role: string) {
        const numericId = this.validateAndConvertId(id);
        const users = await this.usersService.find(numericId, role);
        return { success: true, result: { users } };
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        const numericId = this.validateAndConvertId(id);
        const user = await this.usersService.update(numericId, dto);
        return { success: true, result: user };
    }

    @Delete('delete')
    async deleteAll() {
        await this.usersService.deleteAll();
        return { success: true };
    }

    @Delete('delete/:id')
    async deleteOne(@Param('id') id: string) {
        const numericId = this.validateAndConvertId(id);
        const result = await this.usersService.deleteOne(numericId);
        return { success: true, result };
    }

    private validateAndConvertId(id: string): number {
        const numericId = Number(id);
        if (
            isNaN(numericId) ||
            !Number.isInteger(numericId) ||
            numericId < 0 ||
            numericId > 2147483647
        ) {
            throw new BadRequestException(
                'Invalid id: must be an integer between 0 and 2147483647',
            );
        }
        return numericId;
    }
}

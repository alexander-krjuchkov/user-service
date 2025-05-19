import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { ParseUserIdPipe } from './parse-user-id.pipe';

type SuccessWithResult<T> = {
    success: true;
    result: T;
};

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('create')
    async create(
        @Body() dto: CreateUserDto,
    ): Promise<SuccessWithResult<{ id: number }>> {
        const id = await this.usersService.create(dto);
        return { success: true, result: { id } };
    }

    @Get('get')
    async getAll(
        @Query() query: QueryUsersDto,
    ): Promise<SuccessWithResult<{ users: User[] }>> {
        const users = await this.usersService.find(undefined, query);
        return { success: true, result: { users } };
    }

    @Get('get/:id')
    async getOne(
        @Param('id', ParseUserIdPipe) id: number,
        @Query() query: QueryUsersDto,
    ): Promise<SuccessWithResult<{ users: User[] }>> {
        const users = await this.usersService.find(id, query);
        return { success: true, result: { users } };
    }

    @Patch('update/:id')
    async update(
        @Param('id', ParseUserIdPipe) id: number,
        @Body() dto: UpdateUserDto,
    ): Promise<SuccessWithResult<User>> {
        const user = await this.usersService.update(id, dto);
        return { success: true, result: user };
    }

    @Delete('delete')
    async deleteAll(): Promise<{ success: true }> {
        await this.usersService.deleteAll();
        return { success: true };
    }

    @Delete('delete/:id')
    async deleteOne(
        @Param('id', ParseUserIdPipe) id: number,
    ): Promise<SuccessWithResult<User>> {
        const result = await this.usersService.deleteOne(id);
        return { success: true, result };
    }
}

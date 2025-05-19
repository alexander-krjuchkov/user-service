import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { UserNotFoundError } from './errors/user-not-found.error';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(dto: CreateUserDto): Promise<number> {
        const user = this.userRepository.create(dto);
        await this.userRepository.save(user);
        return user.id;
    }

    async find(id?: number, query?: QueryUsersDto): Promise<User[]> {
        const filters: Partial<User> = {};

        if (id) {
            filters.id = id;
        }
        if (query?.role) {
            filters.role = query.role;
        }

        const users = await this.userRepository.find({ where: filters });

        if (id && !users.length) {
            throw new UserNotFoundError();
        }

        return users;
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, dto);
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new UserNotFoundError();
        }
        return user;
    }

    async deleteOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new UserNotFoundError();
        }
        await this.userRepository.delete(id);
        return user;
    }

    async deleteAll(): Promise<void> {
        await this.userRepository.clear();
    }
}

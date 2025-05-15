import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

    async find(id?: number, role?: string): Promise<User[]> {
        if (id) {
            const user = await this.userRepository.findOneBy({ id: +id });
            if (!user) throw new NotFoundException('User not found');
            return [user];
        }

        if (role) {
            return this.userRepository.find({ where: { role } });
        }

        return this.userRepository.find();
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, dto);
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async deleteOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: +id });
        if (!user) throw new NotFoundException('User not found');
        await this.userRepository.delete(+id);
        return user;
    }

    async deleteAll(): Promise<void> {
        await this.userRepository.clear();
    }
}

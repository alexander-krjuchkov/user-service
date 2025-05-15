import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: +(process.env.DB_PORT ?? 0) || 3306,
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'example',
            database: process.env.DB_NAME || 'dev-users',
            entities: [User],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class AppModule {}

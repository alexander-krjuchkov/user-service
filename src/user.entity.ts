import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { userFullNameMaxLength, userRoleMaxLength } from './constants';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: userFullNameMaxLength })
    full_name: string;

    @Column({ length: userRoleMaxLength })
    role: string;

    @Column()
    efficiency: number;
}

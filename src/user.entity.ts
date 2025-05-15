import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    full_name: string;

    @Column({ length: 255 })
    role: string;

    @Column()
    efficiency: number;
}

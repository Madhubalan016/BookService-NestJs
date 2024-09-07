
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, BaseEntity } from 'typeorm';


@Entity({ name: 'user'})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300 })
    userName: string;

    @Column({ type: 'varchar', length: 300 })
    password: string;

    @Column()
    salt:string;
}
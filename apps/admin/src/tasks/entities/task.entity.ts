import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, DeleteDateColumn } from "typeorm";
import { User } from '../../users/entities/user.entity'

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string

    @Column()
    status: string

    @DeleteDateColumn()
    deleted_at: Date;

    @Column()
    user_id: number    
    
    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'user_id' })
    user: User;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from '../../tasks/entities/task.entity'

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Task, task => task.user, {
        eager: true,
    })
    tasks: Task[]
}

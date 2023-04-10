import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoStatus } from '@todo/models/todo.model';

@Entity()
export class TodoEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.waiting })
	status: TodoStatus;

	@CreateDateColumn({
		type: 'timestamp',
		update: false,
	})
	createdAt: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	updatedAt: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	deletedAt: string;
}

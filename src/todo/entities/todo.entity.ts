import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from '@todo/models/todo.model';
import { BasicEntity } from '@shared/entities/basic.entity';

@Entity()
export class TodoEntity extends BasicEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.waiting })
	status: TodoStatus;
}

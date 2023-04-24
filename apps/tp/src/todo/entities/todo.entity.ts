import { Column, Entity, ManyToOne } from 'typeorm';
import { ITodo, TodoStatus } from '@tp/todo/interfaces/todo.interface';
import { CommonEntity } from '@tp/common/entities/common.entity';
import { UserEntity } from '@tp/user/entities/user.entity';

@Entity()
export class TodoEntity extends CommonEntity implements ITodo {
	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.waiting })
	status: TodoStatus;

	@ManyToOne(() => UserEntity, (user) => user.todos)
	user: UserEntity;
}

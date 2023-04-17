import { Column, Entity, ManyToOne } from 'typeorm';
import { ITodo, TodoStatus } from '@todo/interfaces/todo.interface';
import { BasicEntity } from '@common/entities/basic.entity';
import { UserEntity } from '@user/entities/user.entity';

@Entity()
export class TodoEntity extends BasicEntity implements ITodo {
	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.waiting })
	status: TodoStatus;

	@ManyToOne(() => UserEntity, (user) => user.todos)
	user: UserEntity;
}

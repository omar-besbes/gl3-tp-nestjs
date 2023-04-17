import { Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from '@common/entities/basic.entity';
import { IUser } from '@user/interfaces/user.interface';
import { TodoEntity } from '@todo/entities/todo.entity';

@Entity()
export class UserEntity extends BasicEntity implements IUser {
	@Column()
	name: string;

	@Column()
	age: number;

	@Column({ unique: true })
	email: string;

	@Column({ select: false })
	password: string;

	@Column({ select: false })
	salt: string;

	@OneToMany(() => TodoEntity, (todo) => todo.user)
	todos: TodoEntity[];
}

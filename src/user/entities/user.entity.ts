import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '@common/entities/common.entity';
import { IUser } from '@user/interfaces/user.interface';
import { TodoEntity } from '@todo/entities/todo.entity';
import { CvEntity } from '@cv/entities/cv.entity';

@Entity()
export class UserEntity extends CommonEntity implements IUser {
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

	@OneToMany(() => CvEntity, (cv) => cv.user)
	cvs: CvEntity[];
}

import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '@tp/common/entities/common.entity';
import { IUser } from '@tp/user/interfaces/user.interface';
import { TodoEntity } from '@tp/todo/entities/todo.entity';
import { CvEntity } from '@tp/cv/entities/cv.entity';

@Entity()
export class UserEntity extends CommonEntity implements IUser {
	@Column()
	firstname: string;

	@Column()
	lastname: string;

	@Column()
	age: number;

	@Column({ unique: true })
	email: string;

	@Column({ select: false })
	password: string;

	@Column({ select: false })
	salt: string;

	@Column({ length: 8, unique: true })
	cin: string;

	@OneToMany(() => TodoEntity, (todo) => todo.user)
	todos: TodoEntity[];

	@OneToMany(() => CvEntity, (cv) => cv.user)
	cvs: CvEntity[];
}

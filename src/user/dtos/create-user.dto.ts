import { IUser } from '@user/interfaces/user.interface';
import {
	IsEmail,
	IsInt,
	IsString,
	IsStrongPassword,
	MaxLength,
	Min,
} from 'class-validator';

export class CreateUserDto implements Omit<IUser, 'todos'> {
	@IsInt()
	@Min(18)
	age: number;

	@IsEmail()
	email: string;

	@IsString()
	@MaxLength(50)
	name: string;

	@IsStrongPassword()
	password: string;
}

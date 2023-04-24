import { IUser } from '@tp/user/interfaces/user.interface';
import {
	IsEmail,
	IsInt,
	IsNumberString,
	IsString,
	IsStrongPassword,
	Length,
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
	@MaxLength(25)
	firstname: string;

	@IsString()
	@MaxLength(25)
	lastname: string;

	@IsString()
	@MaxLength(25)
	@IsStrongPassword()
	password: string;

	@IsNumberString()
	@Length(8, 8)
	cin: string;
}

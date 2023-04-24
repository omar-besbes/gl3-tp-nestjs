import { ICv } from '@tp/cv/interfaces/cv.interface';
import { IsString } from 'class-validator';
import { IUser } from '@tp/user/interfaces/user.interface';

export class CreateCvDto implements Omit<ICv, 'user' | 'skills' | keyof IUser> {
	@IsString()
	name: string;

	@IsString()
	job: string;

	@IsString()
	path: string;
}

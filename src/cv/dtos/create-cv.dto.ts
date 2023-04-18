import { ICv } from '@cv/interfaces/cv.interface';
import {
	IsArray,
	IsInt,
	IsNumberString,
	IsString,
	Length,
} from 'class-validator';

export class CreateCvDto implements ICv {
	@IsInt()
	age: number;

	@IsString()
	@IsNumberString()
	@Length(8, 8)
	cin: string;

	@IsString()
	firstname: string;

	@IsString()
	job: string;

	@IsString()
	name: string;

	@IsString()
	path: string;

	@IsArray()
	@IsString({ each: this })
	skills: string[];
}

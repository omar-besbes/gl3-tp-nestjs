import { ITodo } from '@todo/models/todo.model';
import { IsString, MaxLength, MinLength } from 'class-validator';
import {
	DESCRIPTION_MIN_LENGTH,
	NAME_MAX_LENGTH,
	NAME_MIN_LENGTH,
} from '@common/error-messages';

export class CreateTodoDto implements Pick<ITodo, 'name' | 'description'> {
	@IsString()
	@MinLength(3, { message: NAME_MIN_LENGTH })
	@MaxLength(10, { message: NAME_MAX_LENGTH })
	name: string;

	@IsString()
	@MinLength(10, { message: DESCRIPTION_MIN_LENGTH })
	description: string;
}

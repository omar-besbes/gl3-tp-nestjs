import { ITodo } from '@todo/models/todo.model';
import { IsString } from 'class-validator';

export class CreateTodoDto implements Pick<ITodo, 'name' | 'description'> {
	@IsString()
	name: string;

	@IsString()
	description: string;
}

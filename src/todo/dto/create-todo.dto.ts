import { ITodo } from '../model/todo.model';
import { IsString } from 'class-validator';

export class CreateTodoDto implements Pick<ITodo, 'name' | 'description'> {
	@IsString()
	name: string;

	@IsString()
	description: string;
}

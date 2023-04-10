import { ITodo, TodoStatus } from '../model/todo.model';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto implements Omit<ITodo, 'createdAt' | 'id'> {
	@IsString()
	@IsOptional()
	description: string;

	@IsString()
	@IsOptional()
	name: string;

	@IsEnum(TodoStatus)
	@IsOptional()
	status: TodoStatus;
}

import { ITodo, TodoStatus } from '@tp/todo/interfaces/todo.interface';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto implements Omit<ITodo, 'createdAt' | 'id' | 'user'> {
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

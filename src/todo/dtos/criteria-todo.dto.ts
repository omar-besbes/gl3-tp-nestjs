import { TodoStatus } from '@todo/interfaces/todo.interface';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CriteriaTodoDto {
	@IsString()
	@IsOptional()
	search?: string;

	@IsEnum(TodoStatus)
	@IsOptional()
	status?: TodoStatus;
}

import { TodoStatus } from '@todo/models/todo.model';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CriteriaTodoDto {
	@IsString()
	@IsOptional()
	search?: string;

	@IsEnum(TodoStatus)
	@IsOptional()
	status?: TodoStatus;
}

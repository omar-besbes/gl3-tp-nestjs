import { TodoStatus } from '@tp/todo/interfaces/todo.interface';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CriteriaTodoDto {
	@IsString()
	@IsOptional()
	search?: string;

	@IsEnum(TodoStatus)
	@IsOptional()
	status?: TodoStatus;
}

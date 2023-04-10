import { TodoStatus } from '@todo/models/todo.model';
import { IsEnum, IsString } from 'class-validator';

export class CriteriaTodoDto {
	@IsString()
	string?: string;

	@IsEnum(TodoStatus)
	status?: TodoStatus;
}

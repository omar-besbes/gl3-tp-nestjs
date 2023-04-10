import { TodoStatus } from '../model/todo.model';
import { IsEnum, IsString } from 'class-validator';

export class CriteriaTodoDto {
	@IsString()
	string?: string;

	@IsEnum(TodoStatus)
	status?: TodoStatus;
}

import { IsInt } from 'class-validator';

export class PaginateTodoDto {
	@IsInt()
	nb: number;

	@IsInt()
	nbPerPage: number;
}

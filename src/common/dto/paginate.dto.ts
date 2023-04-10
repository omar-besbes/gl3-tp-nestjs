import { IsInt } from 'class-validator';

export class PaginateDto {
	@IsInt()
	nb: number;

	@IsInt()
	nbPerPage: number;
}

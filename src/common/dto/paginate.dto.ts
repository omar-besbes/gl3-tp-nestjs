import { IsInt, IsOptional, Min, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateDto {
	@IsInt()
	@Type(() => Number)
	@Min(0)
	@IsOptional()
	nb?: number;

	@IsInt()
	@Type(() => Number)
	@Min(1)
	@ValidateIf((dto) => !!dto.nb)
	nbPerPage?: number;
}

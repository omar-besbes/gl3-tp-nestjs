import { IsArray, IsString } from 'class-validator';

export class SkillsDto {
	@IsArray()
	@IsString({ each: true })
	skills: string[];
}

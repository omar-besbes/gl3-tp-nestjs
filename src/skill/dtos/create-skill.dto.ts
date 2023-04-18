import { ISkill } from '@skill/interfaces/skill.interface';
import { IsString } from 'class-validator';

export class CreateSkillDto implements ISkill {
	@IsString()
	designation: string;
}

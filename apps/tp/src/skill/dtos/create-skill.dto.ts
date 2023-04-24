import { ISkill } from '@tp/skill/interfaces/skill.interface';
import { IsString } from 'class-validator';

export class CreateSkillDto implements ISkill {
	@IsString()
	designation: string;
}

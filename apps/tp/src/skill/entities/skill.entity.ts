import { CommonEntity } from '@tp/common/entities/common.entity';
import { ISkill } from '@tp/skill/interfaces/skill.interface';
import { Column, Entity } from 'typeorm';

@Entity()
export class SkillEntity extends CommonEntity implements ISkill {
	@Column({ unique: true })
	designation: string;
}

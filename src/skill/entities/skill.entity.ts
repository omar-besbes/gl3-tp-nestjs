import { CommonEntity } from '@common/entities/common.entity';
import { ISkill } from '@skill/interfaces/skill.interface';
import { Column, ManyToMany } from 'typeorm';
import { CvEntity } from '@cv/entities/cv.entity';

export class SkillEntity extends CommonEntity implements ISkill {
	@Column()
	designation: string;

	@ManyToMany(() => CvEntity, (cv) => cv.skills)
	cvs: CvEntity[];
}

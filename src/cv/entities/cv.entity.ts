import { ICv } from '@cv/interfaces/cv.interface';
import { CommonEntity } from '@common/entities/common.entity';
import { Column, ManyToMany, ManyToOne } from 'typeorm';
import { UserEntity } from '@user/entities/user.entity';
import { SkillEntity } from '@skill/entities/skill.entity';

export class CvEntity extends CommonEntity implements ICv {
	@Column()
	age: number;

	@Column({ length: 8 })
	cin: string;

	@Column()
	firstname: string;

	@Column()
	job: string;

	@Column()
	name: string;

	@Column()
	path: string;

	@ManyToOne(() => UserEntity, (user) => user.cvs)
	user: UserEntity;

	@ManyToMany(() => SkillEntity, (skill) => skill.cvs)
	skills: SkillEntity[];
}

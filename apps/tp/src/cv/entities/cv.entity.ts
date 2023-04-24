import { ICv } from '@tp/cv/interfaces/cv.interface';
import { CommonEntity } from '@tp/common/entities/common.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { UserEntity } from '@tp/user/entities/user.entity';
import { SkillEntity } from '@tp/skill/entities/skill.entity';

@Entity()
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

	@JoinTable()
	@ManyToMany(() => SkillEntity, {
		cascade: true,
		onDelete: 'RESTRICT',
	})
	skills: SkillEntity[];
}

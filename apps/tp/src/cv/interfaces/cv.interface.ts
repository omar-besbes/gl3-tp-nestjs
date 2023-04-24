import { UserEntity } from '@tp/user/entities/user.entity';
import { SkillEntity } from '@tp/skill/entities/skill.entity';
import { IUser } from '@tp/user/interfaces/user.interface';

export interface ICv extends Pick<IUser, 'age' | 'cin' | 'firstname'> {
	name: string;
	job: string;
	path: string;
	user: UserEntity;
	skills: SkillEntity[];
}

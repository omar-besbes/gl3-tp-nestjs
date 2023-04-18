import { Injectable } from '@nestjs/common';
import { CreateCvDto } from '@cv/dtos/create-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvEntity } from '@cv/entities/cv.entity';
import { UserEntity } from '@user/entities/user.entity';
import { SkillEntity } from '@skill/entities/skill.entity';
import { UpdateCvDto } from '@cv/dtos/update-cv.dto';
import { CommonService } from '@common/common.service';

@Injectable()
export class CvService extends CommonService<
	CvEntity,
	Omit<CreateCvDto, 'skills'>,
	Omit<UpdateCvDto, 'skills'>
> {
	constructor(
		@InjectRepository(CvEntity)
		protected readonly repository: Repository<CvEntity>,
	) {
		super(repository, CvEntity.name);
	}

	async create(
		createCvDto: Omit<CreateCvDto, 'skills'>,
		user: UserEntity,
		skills: SkillEntity[],
	) {
		const cv = this.repository.create({ ...createCvDto, user, skills });
		return await this.repository.save(cv);
	}
}

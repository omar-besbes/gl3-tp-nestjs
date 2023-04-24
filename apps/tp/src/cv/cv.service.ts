import { Injectable } from '@nestjs/common';
import { CreateCvDto } from '@tp/cv/dtos/create-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvEntity } from '@tp/cv/entities/cv.entity';
import { UserEntity } from '@tp/user/entities/user.entity';
import { SkillEntity } from '@tp/skill/entities/skill.entity';
import { UpdateCvDto } from '@tp/cv/dtos/update-cv.dto';
import { CommonService } from '@tp/common/common.service';
import { ICv } from '@tp/cv/interfaces/cv.interface';

@Injectable()
export class CvService extends CommonService<
	ICv,
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
		const cv = this.repository.create({
			...user,
			...createCvDto,
			user,
			skills,
		});
		await this.repository.save(cv);
		return cv;
	}
}

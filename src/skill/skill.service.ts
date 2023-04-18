import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from '@skill/dtos/create-skill.dto';
import { UpdateSkillDto } from '@skill/dtos/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from '@skill/entities/skill.entity';
import { Repository } from 'typeorm';
import { CommonService } from '@common/common.service';

@Injectable()
export class SkillService extends CommonService<
	SkillEntity,
	CreateSkillDto,
	UpdateSkillDto
> {
	constructor(
		@InjectRepository(SkillEntity)
		protected readonly repository: Repository<SkillEntity>,
	) {
		super(repository, SkillEntity.name);
	}

	async find(ids: string[]) {
		return this.repository.findBy(ids.map((id) => ({ id })));
	}
}

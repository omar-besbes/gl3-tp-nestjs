import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from '@tp/skill/dtos/create-skill.dto';
import { UpdateSkillDto } from '@tp/skill/dtos/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from '@tp/skill/entities/skill.entity';
import { Repository } from 'typeorm';
import { CommonService } from '@tp/common/common.service';
import { ISkill } from '@tp/skill/interfaces/skill.interface';

@Injectable()
export class SkillService extends CommonService<
	ISkill,
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

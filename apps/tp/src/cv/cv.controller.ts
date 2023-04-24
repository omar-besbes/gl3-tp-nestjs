import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from '@tp/cv/dtos/create-cv.dto';
import { UpdateCvDto } from '@tp/cv/dtos/update-cv.dto';
import { AuthUser } from '@tp/todo/decorators/auth-user.decorator';
import { UserEntity } from '@tp/user/entities/user.entity';
import { SkillService } from '@tp/skill/skill.service';
import { SkillsDto } from '@tp/cv/dtos/skills.dto';
import { CommonEntity } from '@tp/common/entities/common.entity';

@Controller('cv')
export class CvController {
	constructor(
		private readonly cvService: CvService,
		private readonly skillService: SkillService,
	) {}

	@Post('add')
	async create(
		@Body() createCvDto: CreateCvDto,
		@Body() { skills: skillIds }: SkillsDto,
		@AuthUser() user: UserEntity,
	) {
		const skills = await this.skillService.find(skillIds);
		return this.cvService.create(createCvDto, user, skills);
	}

	@Get()
	findAll() {
		return this.cvService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: CommonEntity['id']) {
		return this.cvService.findOne(id);
	}

	@Patch('modify/:id')
	async update(
		@Param('id') id: CommonEntity['id'],
		@Body() updateCvDto: UpdateCvDto,
	) {
		const cv = await this.cvService.findOne(id);
		return this.cvService.update(cv, updateCvDto);
	}

	@Delete('remove/:id')
	remove(@Param('id') id: CommonEntity['id']) {
		return this.cvService.remove(id);
	}

	@Patch('restore/:id')
	restore(@Param('id') id: CommonEntity['id']) {
		return this.cvService.restore(id);
	}
}

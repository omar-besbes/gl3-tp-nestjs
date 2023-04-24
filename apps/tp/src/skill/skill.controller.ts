import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from '@tp/skill/dtos/create-skill.dto';
import { UpdateSkillDto } from '@tp/skill/dtos/update-skill.dto';
import { CommonEntity } from '@tp/common/entities/common.entity';

@Controller('skill')
export class SkillController {
	constructor(private readonly skillService: SkillService) {}

	@Post('add')
	create(@Body() createSkillDto: CreateSkillDto) {
		return this.skillService.create(createSkillDto);
	}

	@Get()
	findAll() {
		return this.skillService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: CommonEntity['id']) {
		return this.skillService.findOne(id);
	}

	@Patch('modify/:id')
	async update(
		@Param('id') id: CommonEntity['id'],
		@Body() updateSkillDto: UpdateSkillDto,
	) {
		const skill = await this.skillService.findOne(id);
		return this.skillService.update(skill, updateSkillDto);
	}

	@Delete('remove/:id')
	remove(@Param('id') id: CommonEntity['id']) {
		return this.skillService.remove(id);
	}

	@Patch('restore/:id')
	restore(@Param('id') id: CommonEntity['id']) {
		return this.skillService.restore(id);
	}
}

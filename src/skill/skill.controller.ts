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
import { CreateSkillDto } from '@skill/dtos/create-skill.dto';
import { UpdateSkillDto } from '@skill/dtos/update-skill.dto';

@Controller('skill')
export class SkillController {
	constructor(private readonly skillService: SkillService) {}

	@Post()
	create(@Body() createSkillDto: CreateSkillDto) {
		return this.skillService.create(createSkillDto);
	}

	@Get()
	findAll() {
		return this.skillService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.skillService.findOne(id);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateSkillDto: UpdateSkillDto,
	) {
		const skill = await this.skillService.findOne(id);
		return this.skillService.update(skill, updateSkillDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.skillService.remove(id);
	}
}

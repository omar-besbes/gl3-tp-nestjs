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
import { CreateCvDto } from '@cv/dtos/create-cv.dto';
import { UpdateCvDto } from '@cv/dtos/update-cv.dto';
import { AuthUser } from '@todo/decorators/auth-user.decorator';
import { UserEntity } from '@user/entities/user.entity';
import { SkillService } from '@skill/skill.service';

@Controller('cv')
export class CvController {
	constructor(
		private readonly cvService: CvService,
		private readonly skillService: SkillService,
	) {}

	@Post()
	async create(
		@Body() createCvDto: CreateCvDto,
		@AuthUser() user: UserEntity,
	) {
		const { skills: skillIds, ...data } = createCvDto;
		const skills = await this.skillService.find(skillIds);
		return this.cvService.create(data, user, skills);
	}

	@Get()
	findAll() {
		return this.cvService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.cvService.findOne(id);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
		const cv = await this.cvService.findOne(id);
		return this.cvService.update(cv, updateCvDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.cvService.remove(id);
	}
}

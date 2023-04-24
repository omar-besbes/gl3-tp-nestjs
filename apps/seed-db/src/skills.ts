import { randSkill } from '@ngneat/falso';
import { SkillService } from '@tp/skill/skill.service';
import { CreateSkillDto } from '@tp/skill/dtos/create-skill.dto';

export default async function generateSkills(
	skillService: SkillService,
	number_skills = 20,
) {
	const skills = new Set<string>();
	while (skills.size < number_skills) {
		skills.add(randSkill());
	}

	const skillDtos = Array.from(skills).map((skill) => {
		const dto = new CreateSkillDto();
		dto.designation = skill;
		return dto;
	});

	await Promise.all(
		skillDtos.map((skillDto) => skillService.create(skillDto)),
	);
}

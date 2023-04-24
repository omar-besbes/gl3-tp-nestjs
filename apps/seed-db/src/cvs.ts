import {
	randCompanyName,
	randJobTitle,
	randJobType,
	randNumber,
} from '@ngneat/falso';
import { UserService } from '@tp/user/user.service';
import { CvService } from '@tp/cv/cv.service';
import { CreateCvDto } from '@tp/cv/dtos/create-cv.dto';
import { SkillService } from '@tp/skill/skill.service';

export default async function generateCvs(
	userService: UserService,
	skillService: SkillService,
	cvService: CvService,
) {
	const users = await userService.findAll();
	const skills = await skillService.findAll();
	const cvDtos = users.map(() => {
		const dto = new CreateCvDto();
		dto.name = randCompanyName();
		dto.job = randJobTitle();
		dto.path = randJobType();
		return dto;
	});

	const getRandomSkills = () => {
		const length = randNumber({ min: 1, max: skills.length });
		return Array.from(
			new Set(randNumber({ length, min: 0, max: skills.length - 1 })),
		).map((skill) => skills[skill]);
	};

	await Promise.all(
		cvDtos.map((cvDto, index) =>
			cvService.create(cvDto, users[index], getRandomSkills()),
		),
	);
}

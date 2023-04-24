import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import generateUsers from '@seed-db/users';
import generateSkills from '@seed-db/skills';
import generateCvs from '@seed-db/cvs';
import generateTodos from '@seed-db/todos';
import { UserService } from '@tp/user/user.service';
import { AppModule } from '@tp/app.module';
import { SkillService } from '@tp/skill/skill.service';
import { CvService } from '@tp/cv/cv.service';
import { TodoService } from '@tp/todo/todo.service';

export default async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule);

	if (app.get(ConfigService).getOrThrow('NODE_ENV') !== 'production') {
		await generateUsers(app.get(UserService));

		await generateSkills(app.get(SkillService));

		await generateCvs(
			app.get(UserService),
			app.get(SkillService),
			app.get(CvService),
		);

		await generateTodos(app.get(UserService), app.get(TodoService));
	}

	await app.close();
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app.module';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@user/user.service';
import { SkillService } from '@skill/skill.service';
import { TodoService } from '@todo/todo.service';
import { CvService } from '@cv/cv.service';
import generateUsers from './users';
import generateSkills from './skills';
import generateTodos from './todos';
import generateCvs from './cvs';

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

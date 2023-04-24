import { NestFactory } from '@nestjs/core';
import { AppModule } from '@tp/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	// await seedDB();

	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);

	await app.listen(3000);
}

bootstrap();

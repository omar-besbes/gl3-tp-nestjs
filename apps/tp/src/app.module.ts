import { Module } from '@nestjs/common';
import { AppController } from '@tp/app.controller';
import { AppService } from '@tp/app.service';
import { PremierModule } from '@tp/premier/premier.module';
import { TodoModule } from '@tp/todo/todo.module';
import { CommonModule } from '@tp/common/common.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig, databaseConfig } from '@tp/config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@tp/user/user.module';
import { jwtConfig } from '@tp/config/jwt.config';
import { CvModule } from '@tp/cv/cv.module';
import { SkillModule } from '@tp/skill/skill.module';
import { AuthenticationModule } from '@tp/authentication/authentication.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (
				configService: ConfigService,
			): Promise<TypeOrmModuleOptions> => ({
				...configService.getOrThrow<DatabaseConfig>('database'),
				synchronize: true,
				autoLoadEntities: true,
				logging: 'all',
			}),
		}),
		ConfigModule.forRoot({
			envFilePath: [
				'.env.local',
				'.env',
				'.env.development.local',
				'.env.development',
			],
			load: [databaseConfig, jwtConfig],
			expandVariables: true,
			cache: true,
		}),
		PremierModule,
		TodoModule,
		CommonModule,
		UserModule,
		CvModule,
		SkillModule,
		AuthenticationModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

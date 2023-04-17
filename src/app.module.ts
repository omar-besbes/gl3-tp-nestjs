import { Module } from '@nestjs/common';
import { AppController } from '@app.controller';
import { AppService } from '@app.service';
import { PremierModule } from '@premier/premier.module';
import { TodoModule } from '@todo/todo.module';
import { CommonModule } from '@common/common.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig, databaseConfig } from '@config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@user/user.module';
import { jwtConfig } from '@config/jwt.config';

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

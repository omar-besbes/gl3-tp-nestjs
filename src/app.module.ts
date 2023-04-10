import { Module } from '@nestjs/common';
import { AppController } from '@app.controller';
import { AppService } from '@app.service';
import { PremierModule } from '@premier/premier.module';
import { TodoModule } from '@todo/todo.module';
import { CommonModule } from '@common/common.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig, databaseConfig } from '@config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (
				configService: ConfigService,
			): Promise<TypeOrmModuleOptions> => ({
				type: 'mysql',
				host: configService.getOrThrow<DatabaseConfig>('database').host,
				port: configService.getOrThrow<DatabaseConfig>('database').port,
				username:
					configService.getOrThrow<DatabaseConfig>('database').username,
				password:
					configService.getOrThrow<DatabaseConfig>('database').password,
				database:
					configService.getOrThrow<DatabaseConfig>('database').database,
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
			load: [databaseConfig],
			expandVariables: true,
			cache: true,
		}),
		PremierModule,
		TodoModule,
		CommonModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from '@tp/cv/entities/cv.entity';
import { SkillModule } from '@tp/skill/skill.module';
import { AuthenticationMiddleware } from '@tp/authentication/authentication.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfig } from '@tp/config/jwt.config';
import { UserModule } from '@tp/user/user.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([CvEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.getOrThrow<JwtConfig>('jwt').secret,
				verifyOptions: { ignoreExpiration: false },
				signOptions: {
					expiresIn: configService.getOrThrow<JwtConfig>('jwt').maximumAge,
				},
			}),
		}),
		SkillModule,
		UserModule,
	],
	controllers: [CvController],
	providers: [CvService],
})
export class CvModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthenticationMiddleware).forRoutes(CvController);
	}
}

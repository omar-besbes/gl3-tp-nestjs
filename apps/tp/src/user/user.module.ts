import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@tp/user/entities/user.entity';
import { AuthenticationMiddleware } from '@tp/authentication/authentication.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfig } from '@tp/config/jwt.config';

@Module({
	imports: [
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
		TypeOrmModule.forFeature([UserEntity]),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthenticationMiddleware).forRoutes(UserController);
	}
}

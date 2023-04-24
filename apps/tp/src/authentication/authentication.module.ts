import { Module } from '@nestjs/common';
import { AuthenticationController } from '@tp/authentication/authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '@tp/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfig } from '@tp/config/jwt.config';

@Module({
	imports: [
		UserModule,
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
	],
	controllers: [AuthenticationController],
	providers: [AuthenticationService],
})
export class AuthenticationModule {}

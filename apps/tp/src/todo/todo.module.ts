import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationMiddleware } from '@tp/authentication/authentication.middleware';
import { UserModule } from '@tp/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfig } from '@tp/config/jwt.config';

@Module({
	imports: [
		TypeOrmModule.forFeature([TodoEntity]),
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
		UserModule,
	],
	controllers: [TodoController],
	providers: [TodoService],
})
export class TodoModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer
			.apply(AuthenticationMiddleware)
			.exclude({ path: 'todo/(.*)', method: RequestMethod.GET })
			.forRoutes(TodoController);
	}
}

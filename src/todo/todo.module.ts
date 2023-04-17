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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfig } from '@config/jwt.config';
import { AuthMiddleware } from '@authentication/auth.middleware';
import { UserModule } from '@user/user.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([TodoEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.getOrThrow<JwtConfig>('jwt').secret,
				verifyOptions: { ignoreExpiration: false },
				signOptions: { expiresIn: '60s' },
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
			.apply(AuthMiddleware)
			.exclude({ path: 'todo/(.*)', method: RequestMethod.GET })
			.forRoutes(TodoController);
	}
}

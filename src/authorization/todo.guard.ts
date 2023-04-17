import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	ParseUUIDPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { TodoService } from '@todo/todo.service';
import { UserEntity } from '@user/entities/user.entity';

@Injectable()
export class TodoGuard implements CanActivate {
	private readonly uuidParser: ParseUUIDPipe = new ParseUUIDPipe();

	constructor(private readonly todoService: TodoService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		// manually validate & sanitize id
		const id = await this.uuidParser.transform(request.params.id, {
			type: 'param',
			metatype: String,
			data: 'id',
		});

		// check if user is indeed the creator of the provided todo
		const todo = await this.todoService.getTodo(id);
		const user: UserEntity = request['user'];
		if (todo.user.id !== user.id)
			throw new ForbiddenException('This todo is not yours');

		request['todo'] = todo;
		return true;
	}
}

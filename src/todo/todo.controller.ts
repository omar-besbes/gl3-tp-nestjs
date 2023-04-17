import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseEnumPipe,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from '@todo/dtos/create-todo.dto';
import { UpdateTodoDto } from '@todo/dtos/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { CriteriaTodoDto } from '@todo/dtos/criteria-todo.dto';
import { TodoStatus } from '@todo/interfaces/todo.interface';
import { PaginateDto } from '@common/dtos/paginate.dto';
import { UserEntity } from '@user/entities/user.entity';
import { AuthUser } from '@todo/decorators/auth-user.decorator';
import { CreatorOnly } from '@todo/decorators/creator-only.decorator';
import { Todo } from '@todo/decorators/todo.decorator';

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Get()
	getTodos(@Query() page: PaginateDto): Promise<TodoEntity[]> {
		return this.todoService.getTodos(page);
	}

	@Get('criteria')
	getTodoByCriteria(
		@Query() criteria: CriteriaTodoDto,
	): Promise<TodoEntity[]> {
		return this.todoService.getTodoByCriteria(criteria);
	}

	@Get(':id')
	getTodo(@Param('id', ParseUUIDPipe) id: string) {
		return this.todoService.getTodo(id);
	}

	@Get('status/:status')
	getCountByStatus(
		@Param('status', new ParseEnumPipe(TodoStatus)) status: TodoStatus,
	) {
		return this.todoService.getCountByStatus(status);
	}

	@Post('add')
	addTodo(
		@Body() todo: CreateTodoDto,
		@AuthUser() user: UserEntity,
	): Promise<TodoEntity> {
		return this.todoService.addTodo(todo, user);
	}

	@Patch('modify/:id')
	@CreatorOnly()
	async modifyTodo(
		@Todo() _todo: TodoEntity,
		@Body() todo: UpdateTodoDto,
	): Promise<TodoEntity> {
		return this.todoService.modifyTodo(_todo, todo);
	}

	@Delete('delete/:id')
	@CreatorOnly()
	async removeTodo(@Todo() todo: TodoEntity) {
		return this.todoService.deleteTodo(todo.id);
	}

	@Patch('restore/:id')
	@CreatorOnly()
	async restoreTodo(@Todo() todo: TodoEntity) {
		return this.todoService.restoreTodo(todo.id);
	}
}

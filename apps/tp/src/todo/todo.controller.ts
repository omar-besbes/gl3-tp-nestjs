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
import { TodoService } from '@tp/todo/todo.service';
import { CreateTodoDto } from '@tp/todo/dtos/create-todo.dto';
import { UpdateTodoDto } from '@tp/todo/dtos/update-todo.dto';
import { TodoEntity } from '@tp/todo/entities/todo.entity';
import { CriteriaTodoDto } from '@tp/todo/dtos/criteria-todo.dto';
import { TodoStatus } from '@tp/todo/interfaces/todo.interface';
import { PaginateDto } from '@tp/common/dtos/paginate.dto';
import { UserEntity } from '@tp/user/entities/user.entity';
import { AuthUser } from '@tp/todo/decorators/auth-user.decorator';
import { CreatorOnly } from '@tp/todo/decorators/creator-only.decorator';
import { Todo } from '@tp/todo/decorators/todo.decorator';

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Get()
	getTodos(@Query() page: PaginateDto): Promise<TodoEntity[]> {
		return this.todoService.findAll(page);
	}

	@Get('criteria')
	getTodoByCriteria(
		@Query() criteria: CriteriaTodoDto,
	): Promise<TodoEntity[]> {
		return this.todoService.findByCriteria(criteria);
	}

	@Get(':id')
	getTodo(@Param('id', ParseUUIDPipe) id: string) {
		return this.todoService.findOne(id);
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
		return this.todoService.create(todo, user);
	}

	@Patch('modify/:id')
	@CreatorOnly()
	async modifyTodo(
		@Todo() _todo: TodoEntity,
		@Body() todo: UpdateTodoDto,
	): Promise<TodoEntity> {
		return this.todoService.update(_todo, todo);
	}

	@Delete('delete/:id')
	@CreatorOnly()
	async removeTodo(@Todo() todo: TodoEntity) {
		return this.todoService.remove(todo.id);
	}

	@Patch('restore/:id')
	@CreatorOnly()
	async restoreTodo(@Todo() todo: TodoEntity) {
		return this.todoService.restore(todo.id);
	}
}

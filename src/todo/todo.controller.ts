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
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { CriteriaTodoDto } from './dto/criteria-todo.dto';
import { TodoStatus } from '@todo/models/todo.model';
import { PaginateDto } from '@common/dto/paginate.dto';

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
		console.log(criteria);
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
	addTodo(@Body() todo: CreateTodoDto): Promise<TodoEntity> {
		return this.todoService.addTodo(todo);
	}

	@Patch('modify/:id')
	modifyTodo(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() todo: UpdateTodoDto,
	): Promise<TodoEntity> {
		return this.todoService.modifyTodo(id, todo);
	}

	@Delete('delete/:id')
	removeTodo(@Param('id', ParseUUIDPipe) id: string) {
		return this.todoService.deleteTodo(id);
	}

	@Patch('restore/:id')
	restoreTodo(@Param('id', ParseUUIDPipe) id: string) {
		return this.todoService.restoreTodo(id);
	}
}

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
import { PaginateDto } from '@shared/dto/paginate.dto';
import { CriteriaTodoDto } from './dto/criteria-todo.dto';
import { TodoStatus } from '@todo/models/todo.model';

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Get()
	getTodos(@Query('paginate') page?: PaginateDto): Promise<TodoEntity[]> {
		return this.todoService.getTodos(page);
	}

	@Get(':id')
	getTodo(@Param('id', ParseUUIDPipe) id: string) {
		return this.todoService.getTodo(id);
	}

	@Get('criteria')
	getTodoByCriteria(
		@Query() criteria: CriteriaTodoDto,
	): Promise<TodoEntity[]> {
		return this.todoService.getTodoByCriteria(criteria);
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

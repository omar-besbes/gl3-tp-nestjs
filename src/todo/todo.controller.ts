import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { PaginateTodoDto } from './dto/paginate-todo.dto';
import { CriteriaTodoDto } from './dto/criteria-todo.dto';

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Get('get')
	getTodos(@Query('paginate') page?: PaginateTodoDto): Promise<TodoEntity[]> {
		return this.todoService.getTodos(page);
	}

	@Get('get/:id')
	getTodo(@Param('id', ParseUUIDPipe) id: string) {
		return this.todoService.getTodo(id);
	}

	@Get('get')
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

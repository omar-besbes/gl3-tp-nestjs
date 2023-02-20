import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post} from '@nestjs/common';
import {TodoModel} from "./model/todo.model";
import {TodoService} from "./todo.service";
import {CreateTodoDto} from "./dto/create-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }


  @Get('get')
  getTodos(): TodoModel[] {
    return this.todoService.getTodos();
  }

  @Get('get/:id')
  getTodo(@Param('id', ParseUUIDPipe) id: string) {
    return this.todoService.getTodo(id);
  }

  @Post('add')
  addTodo(@Body() todo: CreateTodoDto): TodoModel {
    return this.todoService.addTodo(todo);
  }

  @Patch('modify/:id')
  modifyTodo(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() todo: UpdateTodoDto
  ): TodoModel {
    return this.todoService.modifyTodo(id, todo);
  }

  @Delete('delete/:id')
  removeTodo(@Param('id', ParseUUIDPipe) id: string) {
    return this.todoService.deleteTodo(id);
  }
}

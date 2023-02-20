import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {TodoModel, TodoStatus} from "./model/todo.model";
import {CreateTodoDto} from "./dto/create-todo.dto";
import {UpdateTodoDto} from "./dto/update-todo.dto";

@Injectable()
export class TodoService {
  private todos: TodoModel[] = [];

  constructor(@Inject('uuid') private readonly uuid) {
  }


  getTodos(): TodoModel[] {
    return this.todos;
  }

  getTodo(id: string): TodoModel {
    const todo = this.todos.find((todo) => todo.id === id);

    if(todo === undefined) throw new NotFoundException('No todo was found with this id');
    return todo;
  }

  addTodo(todo: CreateTodoDto): TodoModel {
    const newTodo = new TodoModel(this.uuid(), todo.name, todo.description, new Date(), TodoStatus.waiting);
    this.todos.push(newTodo);
    return newTodo;
  }

  modifyTodo(id: string, todo: UpdateTodoDto): TodoModel {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if(index < 0) throw new NotFoundException('No todo was found with this id');

    this.todos[index] = {...this.todos[index], ...todo};

    return this.todos[index];
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if(index < 0) throw new NotFoundException('No todo was found with this id');

    this.todos.splice(index, 1);

    return {count: 1};
  }
}

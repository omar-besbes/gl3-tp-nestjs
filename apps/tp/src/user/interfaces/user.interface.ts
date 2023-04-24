import { ITodo } from '@tp/todo/interfaces/todo.interface';

export interface IUser {
	firstname: string;
	lastname: string;
	age: number;
	email: string;
	password: string;
	todos: ITodo[];
	cin: string;
}

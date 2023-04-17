import { ITodo } from '@todo/interfaces/todo.interface';

export interface IUser {
	name: string;
	age: number;
	email: string;
	password: string;
	todos: ITodo[];
}

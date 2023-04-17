import { IUser } from '@user/interfaces/user.interface';

export enum TodoStatus {
	'actif' = 'En cours',
	'waiting' = 'En attente',
	'done' = 'Finalisé',
}

export interface ITodo {
	name: string;
	description: string;
	status: TodoStatus;
	user: IUser;
}

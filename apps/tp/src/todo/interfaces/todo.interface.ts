import { UserEntity } from '@tp/user/entities/user.entity';

export enum TodoStatus {
	'actif' = 'En cours',
	'waiting' = 'En attente',
	'done' = 'Finalisé',
}

export interface ITodo {
	name: string;
	description: string;
	status: TodoStatus;
	user: UserEntity;
}

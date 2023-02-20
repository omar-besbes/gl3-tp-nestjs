export enum TodoStatus {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé'
}

export interface ITodo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatus;
}

export class TodoModel implements ITodo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatus;

  constructor(id: string, name: string, description: string, createdAt: Date, status: TodoStatus) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.status = status;
  }
}
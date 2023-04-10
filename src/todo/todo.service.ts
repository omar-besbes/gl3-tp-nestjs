import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from '@todo/dto/create-todo.dto';
import { UpdateTodoDto } from '@todo/dto/update-todo.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '@todo/entities/todo.entity';
import { TodoStatus } from '@todo/models/todo.model';
import { CriteriaTodoDto } from '@todo/dto/criteria-todo.dto';
import { PaginateDto } from '@shared/dto/paginate.dto';

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(TodoEntity)
		private repository: Repository<TodoEntity>,
	) {}

	async getTodos(page?: PaginateDto): Promise<TodoEntity[]> {
		if (page)
			return this.repository.find({
				skip: page.nbPerPage * (page.nb - 1),
				take: page.nbPerPage,
			});
		else return this.repository.find();
	}

	async getTodo(id: string): Promise<TodoEntity> {
		const todo = await this.repository.findOneBy({ id });

		if (todo === null)
			throw new NotFoundException('No todo was found with this id');
		return todo;
	}

	async getTodoByCriteria(criteria: CriteriaTodoDto): Promise<TodoEntity[]> {
		return await this.repository.find({
			where: [
				{
					status: criteria.status,
					name: Like(`%${criteria.string}%`),
				},
				{
					status: criteria.status,
					description: Like(`%${criteria.string}%`),
				},
			],
		});
	}

	async getCountByStatus(status: TodoStatus): Promise<number> {
		return this.repository.count({ where: { status } });
	}

	async addTodo(todo: CreateTodoDto): Promise<TodoEntity> {
		return this.repository.create(todo);
	}

	async modifyTodo(id: string, newTodo: UpdateTodoDto): Promise<TodoEntity> {
		let todo = await this.repository.findOne({ where: { id } });

		if (todo === null)
			throw new NotFoundException('No todo was found with this id');
		todo = { ...todo, ...newTodo };

		return await this.repository.save(todo);
	}

	async deleteTodo(id: string): Promise<{ count: number }> {
		const { affected } = await this.repository.softDelete(id);

		if (affected < 1)
			throw new NotFoundException('No todo was found with this id');
		return { count: affected };
	}

	async restoreTodo(id: string): Promise<{ count: number }> {
		const { affected } = await this.repository.restore(id);

		if (affected < 1)
			throw new NotFoundException('No todo was found with this id');
		return { count: affected };
	}

	async getTodoCount(status: TodoStatus): Promise<number> {
		return this.repository.count({ where: { status } });
	}
}

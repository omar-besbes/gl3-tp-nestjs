import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from '@todo/dtos/create-todo.dto';
import { UpdateTodoDto } from '@todo/dtos/update-todo.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '@todo/entities/todo.entity';
import { TodoStatus } from '@todo/interfaces/todo.interface';
import { CriteriaTodoDto } from '@todo/dtos/criteria-todo.dto';
import { PaginateDto } from '@common/dtos/paginate.dto';
import { UserEntity } from '@user/entities/user.entity';

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(TodoEntity)
		private readonly repository: Repository<TodoEntity>,
	) {}

	async getTodos(page: PaginateDto): Promise<TodoEntity[]> {
		if (page.nb !== undefined) {
			return this.repository.find({
				skip: page.nbPerPage * page.nb,
				take: page.nbPerPage,
			});
		} else return this.repository.find();
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
					name: Like(`%${criteria.search ?? ''}%`),
				},
				{
					status: criteria.status,
					description: Like(`%${criteria.search ?? ''}%`),
				},
			],
		});
	}

	async getCountByStatus(status: TodoStatus): Promise<number> {
		return this.repository.count({ where: { status } });
	}

	async addTodo(todo: CreateTodoDto, user: UserEntity): Promise<TodoEntity> {
		const response = this.repository.create({ ...todo, user });
		await this.repository.save(response);
		return response;
	}

	async modifyTodo(
		todo: TodoEntity,
		newTodo: UpdateTodoDto,
	): Promise<TodoEntity> {
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

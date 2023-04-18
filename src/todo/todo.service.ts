import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '@todo/dtos/create-todo.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '@todo/entities/todo.entity';
import { TodoStatus } from '@todo/interfaces/todo.interface';
import { CriteriaTodoDto } from '@todo/dtos/criteria-todo.dto';
import { PaginateDto } from '@common/dtos/paginate.dto';
import { UserEntity } from '@user/entities/user.entity';
import { CommonService } from '@common/common.service';
import { UpdateTodoDto } from '@todo/dtos/update-todo.dto';

@Injectable()
export class TodoService extends CommonService<
	TodoEntity,
	CreateTodoDto,
	UpdateTodoDto
> {
	constructor(
		@InjectRepository(TodoEntity)
		protected readonly repository: Repository<TodoEntity>,
	) {
		super(repository, TodoEntity.name);
	}

	async create(todo: CreateTodoDto, user: UserEntity): Promise<TodoEntity> {
		const response = this.repository.create({ ...todo, user });
		return await this.repository.save(response);
	}

	async findAll(page: PaginateDto): Promise<TodoEntity[]> {
		if (page.nb !== undefined) {
			return this.repository.find({
				skip: page.nbPerPage * page.nb,
				take: page.nbPerPage,
			});
		} else return this.repository.find();
	}

	async findByCriteria(criteria: CriteriaTodoDto): Promise<TodoEntity[]> {
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

	async getCount(status: TodoStatus): Promise<number> {
		return this.repository.count({ where: { status } });
	}
}

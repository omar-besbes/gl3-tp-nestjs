import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommonEntity } from '@common/entities/common.entity';

@Injectable()
export class CommonService<
	Entity extends CommonEntity,
	CreateDto extends DeepPartial<Entity>,
	UpdateDto extends DeepPartial<Entity>,
> {
	constructor(
		protected readonly repository: Repository<Entity>,
		private readonly entityName: string,
	) {}

	async create(createDto: CreateDto, ...args: any[]): Promise<Entity> {
		const entity = this.repository.create(createDto);
		return await this.repository.save(entity);
	}

	async findAll(...args: any[]): Promise<Entity[]> {
		return this.repository.find();
	}

	async findOne(id: Entity['id'], ...args: any[]): Promise<Entity> {
		const entity = await this.repository.findOneBy({
			id,
		} as FindOptionsWhere<Entity>);

		if (entity === null)
			throw new NotFoundException(
				`No ${this.entityName} was found with this id`,
			);
		return entity;
	}

	async update(
		entity: Entity,
		updateDto: UpdateDto,
		...args: any[]
	): Promise<Entity> {
		entity = { ...entity, ...updateDto };
		return await this.repository.save(entity);
	}

	async remove(id: Entity['id'], ...args: any[]): Promise<{ count: number }> {
		const { affected } = await this.repository.softDelete(id);

		if (affected < 1)
			throw new NotFoundException(
				`No ${this.entityName} was found with this id`,
			);
		return { count: affected };
	}

	async restore(id: Entity['id'], ...args: any[]): Promise<{ count: number }> {
		const { affected } = await this.repository.restore(id);

		if (affected < 1)
			throw new NotFoundException(
				`No ${this.entityName} was found with this id`,
			);
		return { count: affected };
	}
}

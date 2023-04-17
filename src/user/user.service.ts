import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { UpdateUserDto } from '@user/dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@user/entities/user.entity';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>,
	) {}

	async create(createUserDto: CreateUserDto) {
		const { password, ...data } = createUserDto;
		const salt = await genSalt(10);
		const hashedPassword = await hash(password, salt);
		const user = this.repository.create({
			...data,
			password: hashedPassword,
			salt: salt,
		});
		await this.repository.save(user);
		return user;
	}

	async findAll() {
		return this.repository.find();
	}

	async findOne(id: string) {
		const user = await this.repository.findOneBy({ id });

		if (user === null) throw new NotFoundException('No user was not found');
		else return user;
	}

	async verifyPassword(id: string, password: string) {
		const user = await this.repository.findOne({
			where: { id },
			select: { password: true },
		});
		return compare(password, user.password);
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		let user = await this.repository.findOne({ where: { id } });

		if (user === null) throw new NotFoundException('No user was found');
		user = { ...user, ...updateUserDto };

		return await this.repository.save(user);
	}

	async remove(id: string) {
		const { affected } = await this.repository.softDelete(id);

		if (affected < 1)
			throw new NotFoundException('No todo was found with this id');
		return { count: affected };
	}

	async restore(id: string) {
		const { affected } = await this.repository.restore(id);

		if (affected < 1)
			throw new NotFoundException('No todo was found with this id');
		return { count: affected };
	}
}

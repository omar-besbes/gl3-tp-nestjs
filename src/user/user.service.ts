import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@user/entities/user.entity';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { CommonService } from '@common/common.service';
import { UpdateUserDto } from '@user/dtos/update-user.dto';

@Injectable()
export class UserService extends CommonService<
	UserEntity,
	CreateUserDto,
	UpdateUserDto
> {
	constructor(
		@InjectRepository(UserEntity)
		protected readonly repository: Repository<UserEntity>,
	) {
		super(repository, UserEntity.name);
	}

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

	async verifyPassword(id: string, password: string) {
		const user = await this.repository.findOne({
			where: { id },
			select: { password: true },
		});
		return compare(password, user.password);
	}
}

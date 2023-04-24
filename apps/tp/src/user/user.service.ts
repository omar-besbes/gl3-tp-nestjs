import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { UserEntity } from '@tp/user/entities/user.entity';
import { CreateUserDto } from '@tp/user/dtos/create-user.dto';
import { CommonService } from '@tp/common/common.service';
import { UpdateUserDto } from '@tp/user/dtos/update-user.dto';
import { IUser } from '@tp/user/interfaces/user.interface';

@Injectable()
export class UserService extends CommonService<
	IUser,
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

	async verifyPassword(user: UserEntity, password: string) {
		user = await this.repository.findOne({
			where: { id: user.id },
			select: { password: true },
		});
		return compare(password, user.password);
	}
}

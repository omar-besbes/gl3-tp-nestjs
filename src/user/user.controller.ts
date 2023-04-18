import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { UpdateUserDto } from '@user/dtos/update-user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id);
	}

	@Post('add')
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Patch('modify/:id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		const user = await this.userService.findOne(id);
		return this.userService.update(user, updateUserDto);
	}

	@Delete('remove/:id')
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}

	@Patch('restore/:id')
	restore(@Param('id') id: string) {
		return this.userService.restore(id);
	}
}

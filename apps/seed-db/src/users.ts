import {
	randEmail,
	randFirstName,
	randLastName,
	randNumber,
	randPassword,
} from '@ngneat/falso';
import { CreateUserDto } from '@tp/user/dtos/create-user.dto';
import { UserService } from '@tp/user/user.service';

export default async function generateUsers(
	userService: UserService,
	number_users = 20,
) {
	const userDtos: CreateUserDto[] = Array(number_users)
		.fill(0)
		.map(() => {
			const dto = new CreateUserDto();
			dto.age = randNumber({ min: 0, max: 120 });
			dto.email = randEmail();
			dto.firstname = randFirstName();
			dto.lastname = randLastName();
			dto.password = randPassword();
			dto.cin = randNumber({ min: 0, max: 99999999 })
				.toString()
				.padStart(8, '0');
			return dto;
		});

	await Promise.all(userDtos.map((userDto) => userService.create(userDto)));
}

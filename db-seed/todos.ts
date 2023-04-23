import { randNumber, randProduct } from '@ngneat/falso';
import { UserService } from '@user/user.service';
import { CreateTodoDto } from '@todo/dtos/create-todo.dto';
import { TodoService } from '@todo/todo.service';

export default async function generateTodos(
	userService: UserService,
	todoService: TodoService,
	number_todos = 40,
) {
	const users = await userService.findAll();
	const todoDtos = Array(number_todos)
		.fill(0)
		.map(() => {
			const p = randProduct();
			const dto = new CreateTodoDto();
			dto.name = p.title;
			dto.description = p.description;
			return dto;
		});

	const getRandomUser = () => {
		const index = randNumber({ min: 0, max: users.length });
		return users[index];
	};

	await Promise.all(
		todoDtos.map((todoDto) => todoService.create(todoDto, getRandomUser())),
	);
}

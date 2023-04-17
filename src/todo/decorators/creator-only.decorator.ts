import { UseGuards } from '@nestjs/common';
import { TodoGuard } from '@authorization/todo.guard';

export const CreatorOnly = () => UseGuards(TodoGuard);

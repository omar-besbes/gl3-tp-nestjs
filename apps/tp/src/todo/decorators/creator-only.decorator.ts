import { UseGuards } from '@nestjs/common';
import { TodoGuard } from '@tp/authorization/todo.guard';

export const CreatorOnly = () => UseGuards(TodoGuard);

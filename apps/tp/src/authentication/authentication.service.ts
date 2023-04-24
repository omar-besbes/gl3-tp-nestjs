import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@tp/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@tp/user/dtos/create-user.dto';

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async signup(user: CreateUserDto) {
		return this.userService.create(user);
	}

	async signin(email: string, password: string) {
		try {
			const user = await this.userService.findBy({ email });
			if (await this.userService.verifyPassword(user, password)) {
				return this.jwtService.sign({ userId: user.id });
			} else {
				throw new UnauthorizedException('Please verify your login');
			}
		} catch {
			throw new UnauthorizedException('Please verify your login');
		}
	}
}

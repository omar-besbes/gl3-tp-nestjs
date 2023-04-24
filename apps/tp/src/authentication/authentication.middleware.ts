import {
	Injectable,
	NestMiddleware,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import constants from '../constants';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@tp/user/user.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const headerAuth = req.header(constants.auth_header);

		if (headerAuth === undefined)
			throw new UnauthorizedException('Please verify your login');

		let payload: { userId: string };

		try {
			payload = await this.jwtService.verify(headerAuth);
		} catch {
			throw new UnauthorizedException('Session expired. Please login');
		}

		if (typeof payload === 'string' || !payload.userId)
			throw new UnauthorizedException('Please verify your login');

		const user = await this.userService.findOne(payload.userId);

		if (!user) throw new NotFoundException('User was not found');
		req['user'] = user;

		next();
	}
}

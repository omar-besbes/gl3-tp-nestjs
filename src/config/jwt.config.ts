import { registerAs } from '@nestjs/config';
import * as process from 'process';

export interface JwtConfig {
	secret?: string;
}

export const jwtConfig = registerAs(
	'jwt',
	(): JwtConfig => ({
		secret: process.env.JWT_SECRET,
	}),
);

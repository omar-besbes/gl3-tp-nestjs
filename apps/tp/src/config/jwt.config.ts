import { registerAs } from '@nestjs/config';
import * as process from 'process';

export interface JwtConfig {
	secret?: string;
	maximumAge?: string;
}

export const jwtConfig = registerAs(
	'jwt',
	(): JwtConfig => ({
		secret: process.env.JWT_SECRET,
		maximumAge: process.env.JWT_MAXIMUM_AGE ?? '30m',
	}),
);

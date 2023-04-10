import * as process from 'process';
import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
	username?: string;
	password?: string;
	host?: string;
	port?: number;
	database?: string;
}

export const databaseConfig = registerAs(
	'database',
	(): DatabaseConfig => ({
		username: process.env.DB_USERNAME ?? 'root',
		password: process.env.DB_PASSWORD ?? 'root',
		host: process.env.DB_HOST ?? '127.0.0.1',
		port: parseInt(
			process.env.DB_PORT && process.env.DB_PORT !== ''
				? process.env.DB_PORT
				: '3306',
		),
		database: process.env.DB_NAME ?? 'test',
	}),
);

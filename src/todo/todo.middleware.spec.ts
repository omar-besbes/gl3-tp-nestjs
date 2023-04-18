import { AuthMiddleware } from '@authentication/auth.middleware';

describe('TodoMiddleware', () => {
	it('should be defined', () => {
		expect(AuthMiddleware).toBeDefined();
	});
});

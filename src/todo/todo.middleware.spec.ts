import { AuthMiddleware } from './auth.middleware';

describe('TodoMiddleware', () => {
	it('should be defined', () => {
		expect(new AuthMiddleware()).toBeDefined();
	});
});

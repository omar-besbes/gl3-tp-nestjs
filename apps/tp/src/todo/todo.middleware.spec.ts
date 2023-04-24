import { AuthenticationMiddleware } from '@tp/authentication/authentication.middleware';

describe('TodoMiddleware', () => {
	it('should be defined', () => {
		expect(AuthenticationMiddleware).toBeDefined();
	});
});

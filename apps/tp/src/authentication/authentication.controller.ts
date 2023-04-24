import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from '@tp/authentication/dtos/signin.dto';
import { AuthenticationService } from '@tp/authentication/authentication.service';
import { SignupDto } from '@tp/authentication/dtos/signup.dto';

@Controller('auth')
export class AuthenticationController {
	constructor(private readonly authService: AuthenticationService) {}

	@Post('signin')
	async signin(@Body() data: SigninDto) {
		return await this.authService.signin(data.email, data.password);
	}

	@Post('signup')
	async signup(@Body() data: SignupDto) {
		return await this.authService.signup(data);
	}
}

import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	Get,
	Post,
	Query,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUpdateDto, SignInDto, SignUpDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TokenDto } from './dto/auth.token.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	async signup(@Body(new ValidationPipe()) dto: SignUpDto) {
		try {
			return await this.authService.signup(dto);
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				throw new ForbiddenException('*Email is already signed in!');
			} else {
				throw new BadRequestException(error.response.message);
			}
		}
	}

	@Post('signin')
	async signin(@Body(new ValidationPipe()) dto: SignInDto) {
		try {
			return await this.authService.signin(dto);
		} catch (error) {
			throw new BadRequestException('*Incorrect email or password!');
		}
	}

	@Post('role')
	async role(@Body(new ValidationPipe()) dto: TokenDto) {
		try {
			return await this.authService.role(dto);
		} catch (error) {
			throw new BadRequestException('*Failed to change status role!');
		}
	}

	@Get('role')
	async getRole(@Query('token') token: string) {
		try {
			return await this.authService.getRole(token);
		} catch (error) {
			throw new BadRequestException('*Failed to retrieve role!');
		}
	}

	@Get('username')
	async getUsername(@Query('token') token: string) {
		try {
			return await this.authService.getUsername(token);
		} catch (error) {
			throw new BadRequestException('*Failed to retrieve username!');
		}
	}

	@Post('update')
	update(@Body() dto: AuthUpdateDto) {
		return this.authService.update(dto);
	}
}

import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthUpdateDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	async signup(@Body(new ValidationPipe()) dto: AuthDto) {
		try {
			return await this.authService.signup(dto);
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				throw new ForbiddenException('Email is already signed in!');
			} else {
				throw new BadRequestException(error.response.message);
			}
		}
	}

	@Post('signin')
	signin(@Body() dto: AuthDto) {
		return this.authService.signin(dto);
	}

	@Post('update')
	update(@Body() dto: AuthUpdateDto) {
		return this.authService.update(dto);
	}
}

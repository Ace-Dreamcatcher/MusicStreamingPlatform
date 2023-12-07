import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsOptional()
	@IsString()
	username?: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

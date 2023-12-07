import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AuthUpdateDto {
	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	username?: string;

	@IsOptional()
	@IsString()
	password?: string;
}

import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AuthUpdateDto {
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsEmail()
	newEmail?: string;

	@IsOptional()
	@IsString()
	newUsername?: string;

	@IsOptional()
	@IsString()
	newPassword?: string;
}

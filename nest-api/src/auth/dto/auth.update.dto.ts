import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AuthUpdateDto {
	@IsOptional()
	@IsEmail()
	newEmail?: string;

	@IsOptional()
	@IsString()
	newUsername?: string;

	@IsOptional()
	@IsString()
	newPassword?: string;

	@IsString()
	token?: string;
}

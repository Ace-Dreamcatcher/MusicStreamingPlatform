import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
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

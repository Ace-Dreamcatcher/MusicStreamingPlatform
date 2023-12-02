import { IsNotEmpty, IsString } from "class-validator";

export class AdminDto {
	@IsString()
	@IsNotEmpty()
	songName: string;

	@IsString()
	@IsNotEmpty()
	songGenre: string;

	@IsString()
	@IsNotEmpty()
	songTrack: string;

	@IsString()
	@IsNotEmpty()
	artistName: string;

	@IsString()
	@IsNotEmpty()
	albumName: string;

	@IsString()
	@IsNotEmpty()
	albumImage?: string;
}

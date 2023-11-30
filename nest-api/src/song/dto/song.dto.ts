import { IsString, IsNotEmpty } from "class-validator";

export class SongDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	genre: string;

	@IsString()
	@IsNotEmpty()
	track: string;
}

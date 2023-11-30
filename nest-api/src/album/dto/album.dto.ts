import { IsNotEmpty, IsString } from "class-validator";

export class AlbumDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	image: string;
}

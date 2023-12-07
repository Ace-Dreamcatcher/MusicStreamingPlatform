import { IsString } from 'class-validator';

export class AdminDtoUpdateSong {
	@IsString()
	songName: string;

	@IsString()
	songGenre: string;

	@IsString()
	songFile: string;

	@IsString()
	songNameNew: string;

	@IsString()
	songGenreNew: string;

	@IsString()
	songFileNew: string;
}

export class AdminDtoUpdateArtist {
	@IsString()
	artistName?: string;

	@IsString()
	artistImage?: string;

	/*@IsString()
	artistNameNew: string;

	@IsString()
	artistImageNew: string;*/
}

export class AdminDtoUpdateAlbum {
	@IsString()
	albumName: string;

	@IsString()
	albumImage: string;

	@IsString()
	albumNameNew: string;

	@IsString()
	albumImageNew: string;
}

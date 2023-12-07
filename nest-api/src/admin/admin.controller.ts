import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import {
	AdminDtoAdd,
	AdminDtoDelete,
	AdminDtoUpdateAlbum,
	AdminDtoUpdateArtist,
	AdminDtoUpdateSong,
} from './dto';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { SongService } from 'src/song/song.service';
import { GetArtist } from 'src/artist/decorator';
import { Artist } from '@prisma/client';

@Controller('admin')
export class AdminController {
	constructor(
		private artistService: ArtistService,
		private albumService: AlbumService,
		private songService: SongService,
	) {}

	@Post('add')
	async add(@Body() dto: AdminDtoAdd) {
		const artistMessage: string = await this.artistService.addArtist(
			dto.artistName,
			dto.artistImage,
		);
		const albumMessage: string = await this.albumService.addAlbum(
			dto.albumName,
			dto.artistName,
			dto?.albumImage,
		);
		const songMessage: string = await this.songService.addSong(
			dto.songName,
			dto.songGenre,
			dto.songFile,
			dto.artistName,
			dto.albumName,
		);

		return { artistMessage, albumMessage, songMessage };
	}

	@Post('delete')
	async delete(@Body() dto: AdminDtoDelete) {
		const songMessage: string = await this.songService.deleteSong(dto);
		const albumMessage: string = await this.albumService.deleteAlbum(dto);

		return { songMessage, albumMessage };
	}

	@Post('updateSong')
	async updateSong(@Body() dto: AdminDtoUpdateSong) {
		const songMessage: string = await this.songService.updateSong(dto);

		return { songMessage };
	}

	@Post('updateArtist')
	async updateArtist(
		@Body() dto: AdminDtoUpdateArtist,
		@GetArtist() artist: Artist,
	) {
		return await this.artistService.updateArtist(dto, artist);

		//return { artistMessage };
	}

	@Post('updateAlbum')
	async updateAlbum(@Body() dto: AdminDtoUpdateAlbum) {
		const albumMessage: string = await this.albumService.updateAlbum(dto);

		return { albumMessage };
	}
}

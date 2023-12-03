import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import {
	AdminDtoAdd,
	AdminDtoDelete,
	AdminDtoUpdateAlbum,
	AdminDtoUpdateArtist,
	AdminDtoUpdateSong,
} from "./dto";
import { ArtistService } from "src/artist/artist.service";
import { AlbumService } from "src/album/album.service";
import { SongService } from "src/song/song.service";

@Controller("admin")
export class AdminController {
	constructor(
		private artistService: ArtistService,
		private albumService: AlbumService,
		private songService: SongService,
	) {}

	@Post("add")
	async add(@Body() dto: AdminDtoAdd) {
		await this.artistService.addArtist(dto.artistName, dto.artistImage);
		await this.albumService.addAlbum(
			dto.albumName,
			dto.artistName,
			dto?.albumImage,
		);
		return await this.songService.addSong(
			dto.songName,
			dto.songGenre,
			dto.songFile,
			dto.artistName,
			dto.albumName,
		);
	}

	@Post("delete")
	async delete(@Body() dto: AdminDtoDelete) {
		await this.songService.deleteSong(dto);
		await this.albumService.deleteAlbum(dto);
	}

	@Post("updateSong")
	async updateSong(@Body() dto: AdminDtoUpdateSong) {
		await this.songService.updateSong(dto);
	}

	@Post("updateArtist")
	async updateArtist(@Body() dto: AdminDtoUpdateArtist) {
		await this.artistService.updateArtist(dto);
	}

	@Post("updateAlbum")
	async updateAlbum(@Body() dto: AdminDtoUpdateAlbum) {
		await this.albumService.updateAlbum(dto);
	}
}

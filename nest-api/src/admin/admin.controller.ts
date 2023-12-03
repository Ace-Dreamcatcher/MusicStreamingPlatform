import { Body, Controller, Post } from "@nestjs/common";

import { AdminDtoAdd } from "./dto";
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

	@Post("adminAdd")
	async adminAdd(@Body() dto: AdminDtoAdd) {
		await this.artistService.addArtist(dto.artistName);
		await this.albumService.addAlbum(
			dto.albumName,
			dto.artistName,
			dto?.albumImage,
		);
		await this.songService.addSong(
			dto.songName,
			dto.songGenre,
			dto.songTrack,
			dto.artistName,
			dto.albumName,
		);
	}
}

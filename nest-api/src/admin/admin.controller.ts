import { Body, Controller, Post } from "@nestjs/common";

import { AdminDto } from "./dto";
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
	async adminAdd(@Body() dto: AdminDto) {
		await this.artistService.artistInfo(dto.artistName);
		await this.albumService.albumInfo(
			dto.albumName,
			dto.artistName,
			dto?.albumImage,
		);
		return await this.songService.songInfo(
			dto.songName,
			dto.songGenre,
			dto.songTrack,
			dto.artistName,
			dto.albumName,
		);
	}
}

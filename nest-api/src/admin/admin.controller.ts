import { Body, Controller, Post } from "@nestjs/common";

import { AdminDto } from "./dto";
import { ArtistService } from "src/artist/artist.service";
import { AlbumService } from "src/album/album.service";

@Controller("admin")
export class AdminController {
	constructor(
		private artistService: ArtistService,
		private albumService: AlbumService,
	) {}

	@Post("adminAdd")
	async adminAdd(@Body() dto: AdminDto) {
		await this.artistService.artistInfo(dto.artistName);
		await this.albumService.albumInfo(
			dto.albumName,
			dto.artistName,
			dto?.albumImage,
		);
	}
}

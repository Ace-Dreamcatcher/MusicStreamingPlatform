import { Body, Controller, Post } from "@nestjs/common";

import { AlbumService } from "./album.service";
import { AlbumDto } from "./dto";

@Controller("album")
export class AlbumController {
	constructor(private albumService: AlbumService) {}

	@Post("albumInfo")
	albumInfo(@Body() dto: AlbumDto) {
		return this.albumService.albumInfo(dto);
	}
}

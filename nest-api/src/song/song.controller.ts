import { Body, Controller, Post } from "@nestjs/common";
import { SongDto } from "./dto";
import { SongService } from "./song.service";

@Controller("song")
export class SongController {
	constructor(private songService: SongService) {}

	@Post("addSong")
	addSong(@Body() dto: SongDto) {
		return this.songService.AddSongs(dto);
	}
}

import { Controller, Get } from "@nestjs/common";

import { SongService } from "./song.service";
@Controller("song")
export class SongController {
	constructor(private songService: SongService) {}
	@Get("allSongs")
	async printSongs() {
		return await this.songService.printSongs();
	}
}

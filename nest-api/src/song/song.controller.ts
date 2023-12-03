import { Controller, Get } from "@nestjs/common";
import { Song } from "@prisma/client";

import { GetSong } from "src/song/decorator";
@Controller("song")
export class SongController {
	@Get("allSongs")
	getAllSongs(@GetSong() song: Song) {
		return song;
	}
}

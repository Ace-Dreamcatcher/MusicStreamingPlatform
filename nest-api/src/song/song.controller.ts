import { Controller, Get, Query } from '@nestjs/common';

import { SongService } from './song.service';
@Controller('song')
export class SongController {
	constructor(private songService: SongService) {}

	@Get('getSongs')
	async printSongs() {
		return await this.songService.printSongs();
	}

	@Get('getSearchSongs')
	async printSearchSongs(@Query('query') query: string) {
		return await this.songService.printSearchSongs(query);
	}

	@Get('getGenreSongs')
	async printGenreSongs(@Query('query') query: string) {
		return await this.songService.printGenreSongs(query);
	}
}

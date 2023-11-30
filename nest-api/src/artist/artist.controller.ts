import { Body, Controller, Post } from "@nestjs/common";

import { ArtistService } from "./artist.service";
import { ArtistDto } from "./dto";

@Controller("artist")
export class ArtistController {
	constructor(private artistService: ArtistService) {}

	@Post("artistInfo")
	artistInfo(@Body() dto: ArtistDto) {
		return this.artistService.artistInfo(dto);
	}
}

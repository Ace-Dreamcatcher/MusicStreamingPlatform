import { Module } from "@nestjs/common";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { ArtistService } from "src/artist/artist.service";

@Module({
	controllers: [SongController],
	providers: [SongService, ArtistService],
})
export class SongModule {}

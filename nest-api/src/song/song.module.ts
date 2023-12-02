import { Module } from "@nestjs/common";

import { AdminController } from "src/admin/admin.controller";
import { SongService } from "./song.service";
import { ArtistService } from "src/artist/artist.service";
import { AlbumService } from "src/album/album.service";

@Module({
	controllers: [AdminController],
	providers: [SongService, ArtistService, AlbumService],
})
export class SongModule {}

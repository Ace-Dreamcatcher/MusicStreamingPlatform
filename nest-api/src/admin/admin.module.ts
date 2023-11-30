import { Module } from "@nestjs/common";

import { AdminController } from "./admin.controller";
import { ArtistService } from "src/artist/artist.service";
import { AlbumService } from "src/album/album.service";

@Module({
	providers: [ArtistService, AlbumService],
	controllers: [AdminController],
})
export class AdminModule {}

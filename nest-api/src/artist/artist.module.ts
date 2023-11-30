import { Module } from "@nestjs/common";

import { ArtistService } from "./artist.service";
import { AdminController } from "src/admin/admin.controller";
import { AlbumService } from "src/album/album.service";

@Module({
	controllers: [AdminController],
	providers: [ArtistService, AlbumService],
})
export class ArtistModule {}

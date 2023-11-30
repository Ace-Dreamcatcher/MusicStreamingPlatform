import { Module } from "@nestjs/common";

import { AlbumService } from "./album.service";
import { AdminController } from "src/admin/admin.controller";
import { ArtistService } from "src/artist/artist.service";

@Module({
	controllers: [AdminController],
	providers: [AlbumService, ArtistService],
})
export class AlbumModule {}

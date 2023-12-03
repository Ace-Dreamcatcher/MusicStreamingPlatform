import { Module } from "@nestjs/common";

import { AdminController } from "src/admin/admin.controller";
import { SongService } from "./song.service";
import { ArtistService } from "src/artist/artist.service";
import { AlbumService } from "src/album/album.service";
import { SongController } from "./song.controller";
import { AuthService } from "src/auth/auth.service";

@Module({
	controllers: [AdminController, SongController],
	providers: [SongService, ArtistService, AlbumService, AuthService],
})
export class SongModule {}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SongDto } from "./dto";
import { AlbumDto } from "src/album/dto";
import { ArtistService } from "src/artist/artist.service";

@Injectable()
export class SongService {
	constructor(
		private prisma: PrismaService,
		private artist: ArtistService,
	) {}

	async AddSongs(dto: SongDto) {
		const song = await this.prisma.song.create({
			data: {
				idAlbum: albumdto.name,
				idArtist: await this.artist.id,
				name: dto.name,
				genre: dto.genre,
				track: dto.track,
			},
		});
	}
}

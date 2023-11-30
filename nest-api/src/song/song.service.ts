import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SongDto } from "./dto";
import { ArtistService } from "src/artist/artist.service";

@Injectable()
export class SongService {
	ArtistService: any;
	constructor(
		private prisma: PrismaService,
		private artist: ArtistService,
	) {}

	async AddSongs(dto: SongDto) {
		const song = await this.prisma.song.create({
			data: {
				idAlbum: "o io einai foveros",
				idArtist: await this.ArtistService.addArtist(dto),
				name: dto.name,
				genre: dto.genre,
				track: dto.track,
			},
		});
	}
}

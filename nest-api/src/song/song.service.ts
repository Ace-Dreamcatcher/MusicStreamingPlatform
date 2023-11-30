import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SongDto } from "./dto";
import { AlbumDto } from "src/album/dto";
import { ArtistDto } from "src/artist/dto";

@Injectable()
export class SongService {
	constructor(private prisma: PrismaService) {}

	AddSongs(dto: SongDto, albumdto: AlbumDto, artistdto: ArtistDto) {
		const song = this.prisma.song.create({
			data: {
				idAlbum: albumdto.name,
				idArtist: artistdto.name,
				name: dto.name,
				//genre: dto.genre,
				track: dto.track,
			},
		});
	}
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SongDto } from "./dto";
import { AlbumDto } from "src/album/dto";
<<<<<<< HEAD
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
=======
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
>>>>>>> a393b95a6ee738791ed9e4f22d6ff5e3b12129bc
				track: dto.track,
			},
		});
	}
}

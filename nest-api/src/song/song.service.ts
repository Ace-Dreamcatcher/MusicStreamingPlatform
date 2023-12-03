import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SongService {
	constructor(private prisma: PrismaService) {}

	async addSong(
		name: string,
		genre: string,
		track: string,
		artistName: string,
		albumName: string,
	) {
		const resultArtist = await this.prisma
			.$queryRaw`SELECT id FROM "Artist" WHERE name = ${artistName};`;
		const artistId: string = await resultArtist[0].id;

		const resultAlbum = await this.prisma
			.$queryRaw`SELECT id FROM "Album" WHERE name = ${albumName};`;
		const albumId: string = await resultAlbum[0].id;

		const song = await this.prisma.song.create({
			data: {
				name: name,
				genre: genre,
				track: track,
				artist: {
					connect: { id: artistId },
				},
				album: {
					connect: { id: albumId },
				},
			},
		});
	}
}

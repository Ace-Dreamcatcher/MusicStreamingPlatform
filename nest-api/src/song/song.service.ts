import { Injectable } from "@nestjs/common";
import { AdminDtoDelete } from "src/admin/dto";

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
		const idArtist: string = await resultArtist[0].id;

		const resultAlbum = await this.prisma
			.$queryRaw`SELECT id FROM "Album" WHERE name = ${albumName};`;
		const idAlbum: string = await resultAlbum[0].id;

		const songExists = await this.prisma.song.findFirst({
			where: {
				artistId: idArtist,
				albumId: idAlbum,
				name: name,
			},
		});

		if (songExists === null) {
			await this.prisma.song.create({
				data: {
					name: name,
					genre: genre,
					track: track,
					artists: {
						connect: { id: idArtist },
					},
					albums: {
						connect: { id: idAlbum },
					},
				},
			});

			return "Song Created!";
		}

		return "Song Already Exists!";
	}

	async deleteSong(dto: AdminDtoDelete) {
		const result = await this.prisma
			.$queryRaw`SELECT id FROM "Song" WHERE name = ${dto.songName};`;
		const id: string = await result[0].id;

		await this.prisma.song.delete({
			where: {
				id: id,
				name: dto.songName,
				albums: {
					name: dto.albumName,
				},
				artists: {
					name: dto.artistName,
				},
			},
		});
	}
}

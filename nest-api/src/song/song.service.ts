import { Injectable } from '@nestjs/common';
import { AdminDtoDelete, AdminDtoUpdateSong } from 'src/admin/dto';

import { PrismaService } from 'src/prisma/prisma.service';

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
			.$queryRaw`SELECT id FROM "Album" WHERE (name = ${albumName} AND "artistId" = ${idArtist});`;
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

			return 'Song has been created!';
		}

		return 'Song already exists!';
	}

	async deleteSong(dto: AdminDtoDelete) {
		const song = await this.prisma.song.findFirst({
			where: {
				name: dto.songName,
				albums: {
					name: dto.albumName,
				},
				artists: {
					name: dto.artistName,
				},
			},
		});

		const id: string = song.id;

		await this.prisma.song.delete({
			where: {
				id: id,
			},
		});

		return 'Song has been deleted!';
	}

	async updateSong(dto: AdminDtoUpdateSong) {
		const newName =
			dto.songNameNew !== (undefined || '') ? dto.songNameNew : dto.songName;

		const newGenre =
			dto.songGenreNew !== (undefined || '') ? dto.songGenreNew : dto.songGenre;

		const newFile =
			dto.songFileNew !== (undefined || '') ? dto.songFileNew : dto.songFile;

		await this.prisma.song.update({
			where: {
				name: dto.songName,
				genre: dto.songGenre,
				track: dto.songFile,
			},
			data: {
				name: newName,
				genre: newGenre,
				track: newFile,
			},
		});

		return 'Song has been updated!';
	}

	async printSongs() {
		const resultSong = await this.prisma.song.findMany({
			select: { name: true },
		});
		return resultSong;
	}
}

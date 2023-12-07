import { Injectable } from '@nestjs/common';
import { AdminDtoDelete, AdminDtoUpdateAlbum } from 'src/admin/dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
	constructor(private prisma: PrismaService) {}

	async addAlbum(name: string, artistName: string, image?: string) {
		const result = await this.prisma
			.$queryRaw`SELECT id FROM "Artist" WHERE name = ${artistName};`;
		const idArtist: string = await result[0].id;

		const albumExists = await this.prisma.album.findFirst({
			where: {
				artistId: idArtist,
				name: name,
			},
		});

		if (albumExists === null) {
			await this.prisma.album.create({
				data: {
					name: name,
					artists: {
						connect: { id: idArtist },
					},
					image: image,
				},
			});

			return 'Album has been created!';
		}

		return 'Album already exists!';
	}

	async deleteAlbum(dto: AdminDtoDelete) {
		const resultArtist = await this.prisma
			.$queryRaw`SELECT id FROM "Artist" WHERE name = ${dto.artistName};`;
		const idArtist: string = await resultArtist[0].id;

		const resultAlbum = await this.prisma
			.$queryRaw`SELECT id FROM "Album" WHERE (name = ${dto.albumName} AND "artistId" = ${idArtist});`;
		const idAlbum: string = await resultAlbum[0].id;

		const count = await this.prisma.song.count({
			where: {
				albumId: idAlbum,
			},
		});

		if (count === 0) {
			await this.prisma.album.delete({
				where: {
					id: idAlbum,
				},
			});

			return 'Album has been deleted!';
		}
	}

	async updateAlbum(dto: AdminDtoUpdateAlbum) {
		const newName =
			dto.albumNameNew !== (undefined || '') ? dto.albumNameNew : dto.albumName;

		const newImage =
			dto.albumImageNew !== (undefined || '')
				? dto.albumImageNew
				: dto.albumImage;

		await this.prisma.album.update({
			where: {
				name_image: {
					name: dto.albumName,
					image: dto.albumImage,
				},
			},
			data: {
				name: newName,
				image: newImage,
			},
		});

		return 'Album has been updated!';
	}
}

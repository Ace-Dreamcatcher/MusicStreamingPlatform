import { Injectable } from "@nestjs/common";
import { AdminDtoDelete } from "src/admin/dto";

import { PrismaService } from "src/prisma/prisma.service";

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
		}
	}

	async deleteAlbum(dto: AdminDtoDelete) {
		const resultAlbum = await this.prisma
			.$queryRaw`SELECT id FROM "Album" WHERE name = ${dto.albumName};`;
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
		}
	}
}

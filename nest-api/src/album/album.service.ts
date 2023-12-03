import { Injectable } from "@nestjs/common";

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
}

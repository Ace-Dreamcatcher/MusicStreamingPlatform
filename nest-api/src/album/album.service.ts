import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AlbumService {
	constructor(private prisma: PrismaService) {}

	async albumInfo(name: string, artistName: string, image?: string) {
		const result = await this.prisma
			.$queryRaw`SELECT id FROM "Artist" WHERE name = ${artistName};`;
		const artistId: string = await result[0].id;

		const album = await this.prisma.album.create({
			data: {
				name: name,
				artist: {
					connect: { id: artistId },
				},
				image: image,
			},
		});

		const albumFind = await this.prisma.album.findFirst({
			where: {
				name: name,
			},
			include: {
				artist: true,
			},
		});

		return albumFind;
	}
}

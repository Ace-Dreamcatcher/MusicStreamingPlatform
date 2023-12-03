import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ArtistService {
	constructor(private prisma: PrismaService) {}

	async addArtist(name: string, image: string) {
		const artistExists = await this.prisma.artist.findUnique({
			where: {
				name_image: {
					name: name,
					image: image,
				},
			},
		});

		if (!artistExists) {
			await this.prisma.artist.create({
				data: {
					name: name,
					image: image,
				},
			});
		}
	}
}

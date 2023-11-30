import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ArtistService {
	constructor(private prisma: PrismaService) {}

	async artistInfo(name: string) {
		const artistExists = await this.prisma.artist.findUnique({
			where: {
				name: name,
			},
		});

		if (!artistExists) {
			const artist = await this.prisma.artist.create({
				data: {
					name: name,
				},
			});
		}

		const artistFind = await this.prisma.artist.findFirst({
			where: {
				name: name,
			},
		});

		return artistFind;
	}
}

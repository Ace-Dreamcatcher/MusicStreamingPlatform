import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ArtistDto } from "./dto";

@Injectable()
export class ArtistService {
	constructor(private prisma: PrismaService) {}

	async artistInfo(dto: ArtistDto) {
		const artistExists = await this.prisma.artist.findUnique({
			where: {
				name: dto.name,
			},
		});

		if (!artistExists) {
			const artist = await this.prisma.artist.create({
				data: {
					name: dto.name,
				},
			});
		}

		const artistFind = await this.prisma.artist.findFirst({
			where: {
				name: dto.name,
			},
		});

		return artistFind.id;
	}
}

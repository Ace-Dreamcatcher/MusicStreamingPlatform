import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { AlbumDto } from "./dto";

@Injectable()
export class AlbumService {
	constructor(private prisma: PrismaService) {}

	async albumInfo(dto: AlbumDto) {
		const album = await this.prisma.album.create({
			data: {
				name: dto.name,
				artist: {
					connect: { id: "793bcf72-737f-4cf7-b335-1d68d9be9e74" },
				},
				image: dto.image,
			},
		});

		const albumFind = await this.prisma.album.findFirst({
			where: {
				name: dto.name,
			},
			include: {
				artist: true,
			},
		});

		return albumFind;
	}
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ArtistDto } from "./dto";

@Injectable()
export class ArtistService {
	constructor(private prisma: PrismaService) {
		let id: string;
	}

	async addArtist(dto: ArtistDto) {
		const artistexists = await this.prisma.artist.findUnique({
			where: {
				name: dto.name,
			},
		});
		if (!artistexists) {
			const artist = await this.prisma.artist.create({
				data: {
					name: dto.name,
				},
			});
			return artist.id;
		}
		const artistID = await this.prisma.artist.findFirst({
			where: {
				name: dto.name,
			},
		});
		//delete artistID.name;
		return artistID.id;
	}
}

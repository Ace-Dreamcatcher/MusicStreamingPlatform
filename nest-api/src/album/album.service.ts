import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AlbumDto } from "./dto";

@Injectable()
export class AlbumService {
	constructor(private prisma: PrismaService) {}

	/*let idArtist: string = this.prisma.artist.get()
	AlbumInfo(dto: AlbumDto) {
		const album = this.prisma.album.create({
			data: {
				name: dto.name,
                idArtist:
			},
		});
	}*/
}

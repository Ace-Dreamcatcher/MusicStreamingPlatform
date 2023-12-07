import { Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { AdminDtoUpdateArtist } from 'src/admin/dto';

import { PrismaService } from 'src/prisma/prisma.service';

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

			return 'Artist has been created!';
		}

		return 'Artist already exists!';
	}

	async updateArtist(dto: AdminDtoUpdateArtist) {
		const newName =
			dto.artistNameNew !== (undefined || '')
				? dto.artistNameNew
				: dto.artistName;

		const newImage =
			dto.artistImageNew !== (undefined || '')
				? dto.artistImageNew
				: dto.artistImage;

		await this.prisma.artist.update({
			where: {
				name_image: {
					name: dto.artistName,
					image: dto.artistImage,
				},
			},
			data: {
				name: newName,
				image: newImage,
			},
		});

		return 'Artist has been updated!';
	}
}

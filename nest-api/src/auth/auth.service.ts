import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { AuthDto, AuthUpdateDto } from './dto';
import * as argon from 'argon2';
import { Role } from '@prisma/client';

@Injectable({})
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	async signup(dto: AuthDto) {
		try {
			const hash = await argon.hash(dto.password);

			const username =
				dto.username !== (undefined || '') ? dto.username : 'user';

			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					username,
					hash,
				},
			});

			return this.signToken(
				user.id,
				user.email,
				user.username,
				user.hash,
				user.createAt,
				user.role,
			);
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					throw new ForbiddenException('Email is already signed in!');
				}
			}

			throw e;
		}
	}

	async signin(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		if (!user) {
			throw new ForbiddenException('Invalid email!');
		}

		const passwordMatch = await argon.verify(user.hash, dto.password);
		if (!passwordMatch) {
			throw new ForbiddenException('Incorrect password!');
		}

		return this.signToken(
			user.id,
			user.email,
			user.username,
			user.hash,
			user.createAt,
			user.role,
		);
	}

	async update(dto: AuthUpdateDto) {
		/*return this.signToken(
			updated.id,
			updated.email,
			updated.username,
			updated.hash,
			updated.createAt,
			updated.role,
		);*/
	}

	async signToken(
		id: string,
		email: string,
		username: string,
		hash: string,
		createdAt: Date,
		role: Role,
	): Promise<{ accessToken: string }> {
		const payload = {
			id,
			email,
			username,
			hash,
			createdAt,
			role,
		};

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '15m',
			secret: this.config.get('JWT_SECRET'),
		});

		return {
			accessToken: token,
		};
	}
}

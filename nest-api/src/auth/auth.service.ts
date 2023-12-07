import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { AuthDto } from './dto';
import * as argon from 'argon2';

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
			let username: string = '';

			if (dto.username.length === 0) {
				username = 'user';
			} else {
				username = dto.username;
			}

			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					username,
					hash,
				},
			});

			return this.signToken(user.id, user.email);
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

		return this.signToken(user.id, user.email);
	}

	async signToken(
		userId: string,
		email: string,
	): Promise<{ accessToken: string }> {
		const payload = {
			id: userId,
			email,
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

import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUpdateDto, SignInDto, SignUpDto } from './dto';
import { Role } from '@prisma/client';
import { TokenDto } from './dto/auth.token.dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	async signup(dto: SignUpDto) {
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
			throw e;
		}
	}

	async signin(dto: SignInDto) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					email: dto.email,
				},
			});
			if (!user) {
				throw new BadRequestException();
			}

			const passwordMatch = await argon.verify(user.hash, dto.password);
			if (!passwordMatch) {
				throw new BadRequestException();
			}

			return this.signToken(
				user.id,
				user.email,
				user.username,
				user.hash,
				user.createAt,
				user.role,
			);
		} catch (e) {
			throw e;
		}
	}

	async role(dto: TokenDto) {
		try {
			const decodedToken = this.jwt.decode(dto.token);
			let changeRole: Role;

			if (decodedToken.role === 'FREE') {
				changeRole = Role.PREMIUM;
			} else if (decodedToken.role === 'PREMIUM') {
				changeRole = Role.FREE;
			}

			const user = await this.prisma.user.update({
				where: {
					id: decodedToken.id,
				},
				data: {
					role: changeRole,
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
		} catch (error) {
			throw new BadRequestException();
		}
	}

	async update(dto: AuthUpdateDto) {
		const decodedToken = await this.jwt.decode(dto.token);

		const user = await this.prisma.user.findUnique({
			where: {
				email: decodedToken.email,
			},
		});

		if (!user) {
			throw new ForbiddenException('Invalid user!');
		}

		const newEmail = dto.newEmail !== undefined ? dto.newEmail : user.email;

		const newUsername =
			dto.newUsername !== undefined ? dto.newUsername : user.username;

		const newPassword =
			dto.newPassword !== undefined ? dto.newPassword : user.hash;

		const hash = await argon.hash(newPassword);

		await this.prisma.user.update({
			where: {
				email: decodedToken.email,
			},
			data: {
				email: newEmail,
				username: newUsername,
				hash,
			},
		});

		return {
			message: 'User updated successfully!',
		};
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
			expiresIn: '60m',
			secret: this.config.get<string>('JWT_SECRET'),
		});

		return {
			accessToken: token,
		};
	}
}

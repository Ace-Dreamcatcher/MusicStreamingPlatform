import { ForbiddenException, Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { AuthDto } from "./dto";
import * as argon from "argon2";

@Injectable({})
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async signup(dto: AuthDto) {
		try {
			const hash = await argon.hash(dto.password);
			let username: string = "";
			if (dto.username.length === 0) {
				username = "user";
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
			delete user.hash;
			return user;
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					throw new ForbiddenException("Email is already signed in!");
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
			throw new ForbiddenException("Invalid email!");
		}

		const passwordMatch = await argon.verify(user.hash, dto.password);
		if (!passwordMatch) {
			throw new ForbiddenException("Incorrect password!");
		}

		return user.username;
	}
}

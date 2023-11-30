import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(
		config: ConfigService,
		private prisma: PrismaService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get("JWT_SECRET"),
		});
	}

	async validate(payload: { email: string; password: string }) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: payload.email,
				hash: payload.password,
			},
		});
		delete user.hash;
		delete user.id;
		return user;
	}
}

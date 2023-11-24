import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    async signup(dto: AuthDto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    hash,
                },
            });
            delete user.hash;
            return user;
        } catch(e) {
            if(e instanceof PrismaClientKnownRequestError) {
                if(e.code === "P2002") {
                    throw new ForbiddenException("Email is already signed in!");
                }
            }
            throw e;
        }
    }

    signin() {
        return "I am small";
    }
}

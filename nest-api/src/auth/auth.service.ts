import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    signup(dto: AuthDto) {
        const hash = argon.hash(dto.password);
        return hash;
    }

    signin() {
        return "I am small";
    }
}

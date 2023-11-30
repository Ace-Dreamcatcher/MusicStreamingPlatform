import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

import { PrismaModule } from "./prisma/prisma.module";
import { SongModule } from './song/song.module';

@Module({
	imports: [AuthModule, UserModule, PrismaModule, SongModule],
})
export class AppModule {}

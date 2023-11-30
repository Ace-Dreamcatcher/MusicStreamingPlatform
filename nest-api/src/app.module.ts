import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ArtistModule } from "./artist/artist.module";
import { AlbumModule } from './album/album.module';
import { AdminModule } from './admin/admin.module';

@Module({
	imports: [AuthModule, UserModule, PrismaModule, ArtistModule, AlbumModule, AdminModule],
})
export class AppModule {}

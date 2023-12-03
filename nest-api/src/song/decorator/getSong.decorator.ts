import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetSong = createParamDecorator(
	(data: unknown | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.song;
	},
);

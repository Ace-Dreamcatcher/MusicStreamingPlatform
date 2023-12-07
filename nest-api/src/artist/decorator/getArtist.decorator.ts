import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetArtist = createParamDecorator(
	(data: unknown | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.artist;
	},
);

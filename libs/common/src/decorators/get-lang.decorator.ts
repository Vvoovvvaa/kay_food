import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetLang = createParamDecorator(
    (data, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.lang;
    },
);
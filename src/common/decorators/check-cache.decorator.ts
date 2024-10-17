import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserFromCache = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
  },
);

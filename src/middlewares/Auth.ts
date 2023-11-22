import { CTX, Next } from '../typing';
import jwt from 'jsonwebtoken';
import { ErrorHandling, UserService } from '../services';
import { UserEntity } from '../entities';

export async function DeviceAuth(ctx: CTX, next: Next) {
  const { authorization } = ctx.headers;

  if (!authorization) {
    ctx.status = 401;
    ctx.body = 'Unauthenticated';

    return;
  }

  try {
    const token = authorization.slice(7, authorization.length).trimLeft();

    const result = jwt.verify(token, process.env.JWT_SIGN_DEVICE_KEY) as { _id: string };

    const user = await UserService.getById(result._id);
    ctx.state.user = user;
    return next();
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

export async function Auth(ctx: CTX, next: Next) {
  const { authorization } = ctx.headers;

  if (!authorization) {
    ctx.status = 401;
    ctx.body = 'Unauthenticated';

    return;
  }

  try {
    const token = authorization.slice(7, authorization.length).trimLeft();

    const result = jwt.verify(token, process.env.JWT_SECRET_KEY) as { _id: string };

    const user = await UserService.getById(result._id);
    ctx.state.user = user;
    return next();
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

export async function Admin(ctx: CTX, next: Next) {
  const { user }: { user: UserEntity } = ctx.state;

  if (!user.isAdmin) {
    ctx.status = 401;
    ctx.body = 'Unauthenticated';
    return;
  }

  return await next();
}

import { CTX, Next } from '../typing';
import { ErrorHandling, AuthService, UserService, AuthTokenService } from '../services';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../entities/User';

async function login(ctx: CTX, next: Next) {
  const { email, password, deviceToken } = ctx.request.body;

  try {
    const user = await AuthService.login({ email });

    if (!user.isActive) {
      ctx.status = 401;

      ctx.body = {
        reason: user.reason,
      };

      return next();
    }

    if (!bcrypt.compareSync(password, user.password)) {
      ctx.status = 400;
      ctx.body = 'Bad input';
      return next();
    }

    const accessToken = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY);
    const deviceSignToken = jwt.sign({ _id: user.id }, process.env.JWT_SIGN_DEVICE_KEY);

    await AuthTokenService.save(user, accessToken, deviceToken);

    ctx.status = 200;
    ctx.body = {
      user,
      accessToken,
      deviceSignToken,
    };
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function me(ctx: CTX, next: Next) {
  const { user } = ctx.state;

  try {
    ctx.status = 200;
    ctx.body = user;
    return next();
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function register(ctx: CTX, next: Next) {
  const { email, firstName, lastName, isAdmin = false, password }: User = ctx.request.body;

  try {
    const user = await UserService.save({ email, firstName, lastName, password, isAdmin });

    const accessToken = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY);
    const deviceSignToken = jwt.sign({ _id: user.id }, process.env.JWT_SIGN_DEVICE_KEY);

    ctx.status = 200;
    ctx.body = {
      user,
      accessToken,
      deviceSignToken,
    };
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function logout(ctx: CTX, next: Next) {
  const { user } = ctx.state;

  return (ctx.body = await UserService.removeToken(user));
}

export default { login, me, register, logout };

import { ErrorHandling, UserService } from '../services';
import { CTX, Next } from '../typing';

async function FindUser(ctx: CTX, next: Next) {
  const { userId } = ctx.request.body;

  try {
    ctx.state.user = await UserService.getById(userId);
    next();
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

export default { FindUser };

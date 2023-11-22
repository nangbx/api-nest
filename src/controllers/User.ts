import { CTX, Next } from '../typing';
import { ErrorHandling, UserService } from '../services';

const getAll = async (ctx: CTX) => {
  const { limit = 10, page = 1, email = '' } = ctx.query;

  try {
    const users = await UserService.getAllPaging({ limit, offset: page - 1, email });

    ctx.status = 200;
    ctx.body = users;
  } catch (error) {
    ErrorHandling(ctx, error);
  }
};

const getById = async (ctx: CTX) => {
  const { id } = ctx.params;

  try {
    const user = await UserService.getById(id);

    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ErrorHandling(ctx, error);
  }
};

const createUser = async (ctx: CTX) => {
  const { firstName, lastName, isAdmin = false, email, password } = ctx.request.body;

  try {
    const user = await UserService.save({ email, firstName, lastName, password, isAdmin });

    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ErrorHandling(ctx, error);
  }
};

const updateUser = async (ctx: CTX, next: Next) => {
  const { user } = ctx.request.body;

  try {
    return (ctx.body = await UserService.update(user));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
};

const deactive = async (ctx: CTX, next: Next) => {
  const { status, reason } = ctx.request.body;

  try {
    const { id } = ctx.params;

    const user = await UserService.getById(id);

    return (ctx.body = await UserService.update({ ...user, isActive: status, reason }));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
};

export default { getAll, getById, createUser, updateUser, deactive };

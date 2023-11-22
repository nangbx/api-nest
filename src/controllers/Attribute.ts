import { CTX, Next } from '../typing';
import { AttributeService, ErrorHandling } from '../services';

async function findOne(ctx: CTX, next: Next) {
  try {
    const { slug } = ctx.params;

    const data = await AttributeService.getAttributeMeta(slug);

    return (ctx.body = data);
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function update(ctx: CTX, next: Next) {
  try {
    return (ctx.body = await AttributeService.update(ctx.request.body));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function deleteAttribute(ctx: CTX, next: Next) {
  try {
    return (ctx.body = await AttributeService.deleteAttribute(ctx.params.id));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

export default { findOne, update, deleteAttribute };

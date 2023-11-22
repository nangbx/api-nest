import { CTX, Next } from '../typing';
import { BannerService, ErrorHandling } from '../services';

async function save(ctx: CTX, next: Next) {
  try {
    const { url } = ctx.request.body;

    return (ctx.body = await BannerService.save(url));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function deleteBanner(ctx: CTX, next: Next) {
  try {
    const { id } = ctx.params;

    return (ctx.body = await BannerService.deleteBanner(id));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function getAllPaging(ctx: CTX, next: Next) {
  try {
    const { limit = 10, page = 1 } = ctx.query;

    return (ctx.body = await BannerService.getAllBannerPaging(page, limit));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

export default { save, deleteBanner, getAllPaging };

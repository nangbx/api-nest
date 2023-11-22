import { CTX, Next } from '../typing';
import slugify from 'slugify';
import { DeviceService, AttributeService, ErrorHandling } from '../services';

async function suggestSlug(ctx: CTX, next: Next) {
  try {
    const { name, type = 'DEVICE' } = ctx.request.body;
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let slug = slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g }) + '-';

    // eslint-disable-next-line no-constant-condition
    while (true) {
      for (let i = 0; i < 5; i++) {
        slug += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const isExist =
        type === 'DEVICE' ? await DeviceService.verifySlugExist(slug) : await AttributeService.verifySlugExist(slug);

      if (!isExist) {
        ctx.body = { slug };
        return next();
      }
    }
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function verifySlugExist(ctx: CTX, next: Next) {
  try {
    const { name } = ctx.request.body;

    ctx.body = {
      verify: !((await DeviceService.verifySlugExist(name)) || (await AttributeService.verifySlugExist(name))),
    };

    return next();
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

export default { suggestSlug, verifySlugExist };

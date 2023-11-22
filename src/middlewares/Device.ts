import { CTX } from '../typing';
import { Next } from 'koa';
import { DeviceService, AttributeService } from '../services';

async function verify(ctx: CTX, next: Next) {
  const { device, attribute } = ctx.params;
  const { user } = ctx.state;

  ctx.state.device = await DeviceService.getDeviceBySlug(device, user);
  ctx.state.attribute = await AttributeService.getAttributeBySlugName(attribute);

  return next();
}

export default { verify };

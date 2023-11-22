import combineRouters from 'koa-combine-routers';

import userRouter from './User';
import authRouter from './Auth';
import deviceRouter from './Device';
import slugRouter from './Slug';
import attributeRouter from './Attribute';
import bannerRouter from './Banner';
import platformRouter from './PlatformVersion';

export default combineRouters(
  userRouter,
  authRouter,
  deviceRouter,
  slugRouter,
  attributeRouter,
  bannerRouter,
  platformRouter,
);

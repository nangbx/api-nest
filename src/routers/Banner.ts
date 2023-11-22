import Router from 'koa-router';
import { AuthMiddleware, AdminMiddleware } from '../middlewares';
import { BannerController } from '../controllers';

const router = new Router({ prefix: '/api/banners' });

router.post('/', AuthMiddleware, AdminMiddleware, BannerController.save);
router.delete('/:id', AuthMiddleware, AdminMiddleware, BannerController.deleteBanner);
router.get('/', AuthMiddleware, BannerController.getAllPaging);

export default router;

import Router from 'koa-router';
import { SlugController } from '../controllers';

const router = new Router({ prefix: '/api/slug' });

router.post('/suggest', SlugController.suggestSlug);
router.post('/verify', SlugController.verifySlugExist);

export default router;

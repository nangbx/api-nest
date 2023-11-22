import Router from 'koa-router';
import { AttributeController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const router = new Router({ prefix: '/api/attributes' });

router.get('/:slug', AuthMiddleware, AttributeController.findOne);
router.post('/:id', AuthMiddleware, AttributeController.update);
router.delete('/:id', AuthMiddleware, AttributeController.deleteAttribute);

export default router;

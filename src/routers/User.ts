import Router from 'koa-router';
import { UserController } from '../controllers';
import { userSchema } from '../validationSchema';
import Validator from 'koa-yup-validator';
import { AdminMiddleware, AuthMiddleware } from '../middlewares';

const router = new Router({ prefix: '/api/users' });

router.get('/', AuthMiddleware, AdminMiddleware, UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', Validator(userSchema), UserController.createUser);
router.post('/:id/edit', AuthMiddleware, AdminMiddleware, UserController.updateUser);
router.post('/:id/deactive', AuthMiddleware, AdminMiddleware, UserController.deactive);
export default router;

import Router from 'koa-router';
import { AuthController } from '../controllers';
import Validator from 'koa-yup-validator';
import { loginSchema, userSchema } from '../validationSchema';
import { AuthMiddleware } from '../middlewares';

const router = new Router({ prefix: '/api/auth' });

router.post('/login', Validator(loginSchema), AuthController.login);
router.get('/me', AuthMiddleware, AuthController.me);
router.post('/register', Validator(userSchema), AuthController.register);
router.post('/logout', AuthMiddleware, AuthController.logout);

export default router;

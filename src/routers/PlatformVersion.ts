import Router from 'koa-router';
import Validator from 'koa-yup-validator';
import { PlatformVersionController } from '../controllers';
import { AuthMiddleware, DeviceAuthMiddeware } from '../middlewares';
import { platformVersionSchema } from '../validationSchema';

const router = new Router({ prefix: '/api/platforms' });

router.post('/', AuthMiddleware, Validator(platformVersionSchema), PlatformVersionController.createNewVersion);
router.get('/', AuthMiddleware, PlatformVersionController.getAllPaging);
router.get('/:slug/verify', DeviceAuthMiddeware, PlatformVersionController.deviceVerifyVersion);
router.get('/:id', AuthMiddleware, PlatformVersionController.getById);
router.put('/:id', AuthMiddleware, Validator(platformVersionSchema), PlatformVersionController.editById);
router.delete('/:id', AuthMiddleware, PlatformVersionController.deleteById);
router.post('/verify-key', PlatformVersionController.verifyPlatformVersionKey);
router.get('/:slug/download', DeviceAuthMiddeware, PlatformVersionController.getDownloadVersionLink);
router.get('/:slug/binary-download', DeviceAuthMiddeware, PlatformVersionController.downloadBinaryFile);
router.post('/:slug/update-key', DeviceAuthMiddeware, PlatformVersionController.updateDevicePlatformKey);
export default router;

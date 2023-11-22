import { DeviceController } from '../controllers';
import Router from 'koa-router';
import Validator from 'koa-yup-validator';
import { AuthMiddleware, DeviceAuthMiddeware, DeviceMiddleware } from '../middlewares';
import { deviceSchema } from '../validationSchema';

const router = new Router({ prefix: '/api/devices' });

router.get('/:slug', AuthMiddleware, DeviceController.getDeviceBySlugName);
router.get('/', AuthMiddleware, DeviceController.getDevicesByUser);
router.post('/', AuthMiddleware, Validator(deviceSchema), DeviceController.save);
router.post('/:slug', AuthMiddleware, DeviceController.update);
router.post('/:slug/new', AuthMiddleware, DeviceController.getDeviceBySlugName, DeviceController.newAttribute);
router.post(
  '/:device/attributes/:attribute',
  DeviceAuthMiddeware,
  DeviceMiddleware.verify,
  DeviceController.saveDeviceValue,
);
router.post(
  '/:device/attributes/:attribute/old-datas',
  AuthMiddleware,
  DeviceMiddleware.verify,
  DeviceController.saveOldDeviceValues,
);
router.get(
  '/:device/attributes/:attribute/frequently',
  AuthMiddleware,
  DeviceMiddleware.verify,
  DeviceController.getFrequentlyAttributeValue,
);
router.get(
  '/:device/attributes/:attribute/paging',
  AuthMiddleware,
  DeviceMiddleware.verify,
  DeviceController.getAttributeValuePaging,
);
router.get(
  '/:device/attributes/:attribute/filter',
  AuthMiddleware,
  DeviceMiddleware.verify,
  DeviceController.getAttributeValueFilter,
);
router.delete('/:device', AuthMiddleware, DeviceMiddleware.verify, DeviceController.deleteDevice);

export default router;

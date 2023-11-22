import { DeviceEntity, UserEntity } from '../entities';
import { getRepository } from 'typeorm';
import { removeEmpty, TableName } from '../utils';
import { DeviceEditInput } from '../typing/Input';
import { PlatformVersionService } from '.';

async function getDevicesByUser(user: UserEntity) {
  const Device = getRepository(DeviceEntity);

  return await Device.find({
    where: {
      userId: user.id,
    },
    relations: [TableName.Attribute],
  });
}

async function getDeviceById(deviceId: string, user: UserEntity) {
  const Device = getRepository(DeviceEntity);
  const User = getRepository(UserEntity);

  const queryCondition = { id: deviceId, userId: user.isAdmin ? undefined : user.id };

  const device = await Device.findOne(removeEmpty(queryCondition), {
    relations: [TableName.Attribute],
  });

  device.user = await User.findOne(device.userId);

  return device;
}

async function getDeviceBySlug(slug: string, user: UserEntity) {
  const Device = getRepository(DeviceEntity);
  const User = getRepository(UserEntity);

  const queryCondition = { slug };

  const device = await Device.findOne(removeEmpty(queryCondition), {
    relations: [TableName.Attribute],
  });

  device.user = await User.findOne(device.userId);
  device.platformVersion = device.currentPlatformVersionId
    ? await PlatformVersionService.getById(device.currentPlatformVersionId)
    : null;

  return device;
}

async function save(device: DeviceEntity) {
  const Device = getRepository(DeviceEntity);

  return await Device.save(device);
}

async function verifySlugExist(slug: string) {
  const Device = getRepository(DeviceEntity);

  return !!(await Device.findOne({ slug }));
}

async function update(slugId: string, updated: DeviceEditInput) {
  const Device = getRepository(DeviceEntity);

  const device = await Device.findOne({ where: { slug: slugId } });

  return await Device.save({
    ...device,
    ...updated,
  });
}

async function deleteDevice(id: string) {
  const Device = getRepository(DeviceEntity);

  return await Device.delete({ id });
}

export default { getDeviceById, save, getDeviceBySlug, verifySlugExist, getDevicesByUser, update, deleteDevice };

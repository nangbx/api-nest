import { DeviceEntity, AttributeEntity, UserEntity } from '../entities';
import { AttributeService, AuthTokenService, DeviceService, ErrorHandling, PlatformVersionService } from '../services';
import { getConnection } from 'typeorm';
import { CTX, Next } from '../typing';
import { DeviceEditInput, AttributeDataType } from '../typing/Input';
import * as admin from 'firebase-admin';

async function getDeviceBySlugName(ctx: CTX, next: Next) {
  const { slug } = ctx.params;
  const { user } = ctx.state;

  const device = await DeviceService.getDeviceBySlug(slug, user);

  ctx.state.device = device;
  ctx.body = device;

  return next();
}

const save = async (ctx: CTX, next: Next) => {
  const { name, image, attributes, slug }: DeviceEntity = ctx.request.body;
  const { user } = ctx.state;

  try {
    await getConnection().transaction(async () => {
      const device = await DeviceService.save({ name, image, userId: user.id, user, slug });

      device.attributes = await AttributeService.saveRange([
        ...attributes.map((attr) => ({
          name: attr.name,
          dataType: attr.dataType,
          dataLabel: attr.dataLabel,
          deviceId: device.id,
          slug: attr.slug,
        })),
      ]);

      ctx.status = 200;
      ctx.body = device;

      return await next();
    });
  } catch (error) {
    ErrorHandling(ctx, error);
  }
};

async function getDevicesByUser(ctx: CTX, next: Next) {
  try {
    return (ctx.body = await DeviceService.getDevicesByUser(ctx.state.user));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function update(ctx: CTX, next: Next) {
  try {
    const { slug: slugParams } = ctx.params;

    const { name, image, slug, allowAutoUpdate }: DeviceEditInput = ctx.request.body;

    return (ctx.body = await DeviceService.update(slugParams, { name, image, slug, allowAutoUpdate }));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function saveDeviceValue(ctx: CTX, next: Next) {
  try {
    const {
      attribute,
      user,
      device,
    }: { attribute: AttributeEntity; device: DeviceEntity; user: UserEntity } = ctx.state;

    if (
      !attribute.isActive ||
      !device.isActive ||
      !user.isActive ||
      device.id !== attribute.deviceId ||
      user.id !== device.userId
    ) {
      ctx.body = 400;
      return await next();
    }

    const { 'platform-version': devicePlatformVersionKey } = ctx.headers;

    const version = await PlatformVersionService.getVersionByKey(devicePlatformVersionKey);

    if (version) {
      await DeviceService.update(device.slug, { currentPlatformVersionId: version.id });
    }

    const { value }: { value: AttributeDataType } = ctx.request.body;

    const insertData = await AttributeService.insert(attribute, value);

    const registrationTokens = await AuthTokenService.getDeviceTokensByUser(user);

    const payload: any = {
      data: {
        data: JSON.stringify(insertData).toString(),
      },
    };

    await admin
      .messaging()
      .sendToDevice(registrationTokens, payload)
      .then(function (response) {
        console.log('Successfully sent message:', response);
      })
      .catch(function (error) {
        console.log('Error sending message:', error);
      });

    return (ctx.body = insertData);
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function saveOldDeviceValues(ctx: CTX, next: Next) {
  try {
    const {
      attribute,
      user,
      device,
    }: { attribute: AttributeEntity; device: DeviceEntity; user: UserEntity } = ctx.state;

    if (!attribute.isActive || !device.isActive || !user.isActive) {
      ctx.body = 400;
      return await next();
    }

    console.log(ctx.request.body);

    // console.log(data);

    await AttributeService.insertRange(attribute, ctx.request.body);

    return (ctx.status = 200);
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function getFrequentlyAttributeValue(ctx: CTX, next: Next) {
  try {
    const { attribute }: { attribute: AttributeEntity; device: DeviceEntity; user: UserEntity } = ctx.state;
    const { from, to }: { from: string; to: string } = ctx.query;

    return (ctx.body = await AttributeService.getAttributeFrequentlyValue(attribute, from, to));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function getAttributeValuePaging(ctx: CTX, next: Next) {
  try {
    const { attribute }: { attribute: AttributeEntity; device: DeviceEntity; user: UserEntity } = ctx.state;

    const { page = 1, from, to } = ctx.query;

    return (ctx.body = await AttributeService.getAttributeValuePaging(attribute, { page, from, to }));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function getAttributeValueFilter(ctx: CTX, next: Next) {
  try {
    const { attribute }: { attribute: AttributeEntity; device: DeviceEntity; user: UserEntity } = ctx.state;

    const { from, to } = ctx.query;

    return (ctx.body = await AttributeService.getAttributeValueFilter(attribute, { from, to }));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function newAttribute(ctx: CTX, next: Next) {
  try {
    const { name, slug, dataLabel, dataType }: AttributeEntity = ctx.request.body;
    const { device } = ctx.state;

    return (ctx.body = await AttributeService.saveRange([{ name, slug, dataLabel, dataType, deviceId: device.id }]));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function deleteDevice(ctx: CTX, next: Next) {
  try {
    const device: DeviceEntity = ctx.state.device;

    return (ctx.body = await DeviceService.deleteDevice(device.id));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

export default {
  getDeviceBySlugName,
  save,
  getDevicesByUser,
  update,
  saveDeviceValue,
  getFrequentlyAttributeValue,
  getAttributeValuePaging,
  newAttribute,
  saveOldDeviceValues,
  getAttributeValueFilter,
  deleteDevice,
};

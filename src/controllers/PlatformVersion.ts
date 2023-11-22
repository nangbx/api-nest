/* eslint-disable @typescript-eslint/await-thenable */
import { CTX, Next } from '../typing';
import { PlatformVersionService, ErrorHandling, PlatformVersionMediaService, DeviceService } from '../services';
import { PlatformVersionEntity } from '../entities';
import http from 'https';

async function getAllPaging(ctx: CTX, next: Next) {
  const { limit = 20, page = 1, search = '' } = ctx.query;

  const { user } = ctx.state;

  try {
    return (ctx.body = await PlatformVersionService.getAllPaging({ limit, offset: page - 1 }, user, search));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function createNewVersion(ctx: CTX, next: Next) {
  const { description, name, medias, releaseType, releaseKey }: PlatformVersionEntity = ctx.request.body;

  const { user } = ctx.state;

  try {
    const versionEntity = await PlatformVersionService.saveNewPlatformVersion({
      description,
      name,
      releaseType,
      releaseKey,
      userId: user.id,
    });
    const mediasEntity = await PlatformVersionMediaService.saveVersionMedias(
      medias.map((media) => ({ ...media, versionId: versionEntity.id })),
    );

    return (ctx.body = {
      ...versionEntity,
      medias: mediasEntity,
    });
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function deviceVerifyVersion(ctx: CTX, next: Next) {
  const { slug } = ctx.params;
  const { user } = ctx.state;

  try {
    const device = await DeviceService.getDeviceBySlug(slug, user);
    const lastPlaftformVersion = await PlatformVersionService.getNewestVersionByUserId(user.id);

    return (ctx.body = {
      currentVersion: device.platformVersion,
      isNewestVersion: lastPlaftformVersion.id === device.currentPlatformVersionId ? 1 : 0,
      newestVersionKey: lastPlaftformVersion.releaseKey,
      allowUpdate: device.allowAutoUpdate ? 1 : 0,
    });
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function getById(ctx: CTX, next: Next) {
  const { id } = ctx.params;
  try {
    return (ctx.body = await PlatformVersionService.getById(id));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function editById(ctx: CTX, next: Next) {
  const { id } = ctx.params;
  const { user } = ctx.state;

  const { description, name, medias, releaseType }: PlatformVersionEntity = ctx.request.body;

  try {
    const version = await PlatformVersionService.getById(id);

    if (!version) {
      return (ctx.body = 404);
    }

    return (ctx.body = await PlatformVersionService.editById(id, {
      description,
      name,
      medias,
      releaseType,
      releaseKey: version.releaseKey,
      userId: user.id,
    }));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function deleteById(ctx: CTX, next: Next) {
  const { id } = ctx.params;

  try {
    return (ctx.body = await PlatformVersionService.deleteById(id));
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function verifyPlatformVersionKey(ctx: CTX, next: Next) {
  const { value } = ctx.request.body;

  try {
    return (ctx.body = !(await PlatformVersionService.getVersionByKey(value)));
  } catch (error) {
    console.log('error');
    return (ctx.body = false);
  }
}

async function getDownloadVersionLink(ctx: CTX, next: Next) {
  const { slug } = ctx.params;
  const { user } = ctx.state;

  try {
    const device = await DeviceService.getDeviceBySlug(slug, user);
    const lastPlaftformVersion = await PlatformVersionService.getNewestVersionByUserId(user.id);

    if (device.allowAutoUpdate && lastPlaftformVersion.id !== device.currentPlatformVersionId) {
      return (ctx.body = lastPlaftformVersion);
    }

    return (ctx.status = 403);
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

function getBinaryFormUrl(url: string) {
  return new Promise((resole, reject) => {
    try {
      http.get(url, function (res) {
        const data: any = [];

        res
          .on('data', function (chunk) {
            data.push(chunk);
          })
          .on('end', function () {
            //at this point data is an array of Buffers
            //so Buffer.concat() can make us a new Buffer
            //of all of them together
            const buffer = Buffer.concat(data);
            console.log(buffer.toString('base64'));
            resole(buffer);
          });
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function downloadBinaryFile(ctx: CTX, next: Next) {
  const { slug } = ctx.params;
  const { user } = ctx.state;

  try {
    const device = await DeviceService.getDeviceBySlug(slug, user);
    const lastPlaftformVersion = await PlatformVersionService.getNewestVersionByUserId(user.id);

    if (device.allowAutoUpdate && lastPlaftformVersion.id !== device.currentPlatformVersionId) {
      const binaryFileUrl = lastPlaftformVersion.medias.find((f) => f.fileName.includes('.bin'));

      if (binaryFileUrl) {
        const binary = await getBinaryFormUrl(binaryFileUrl.filePath);

        return (ctx.body = binary);
      }

      return (ctx.status = 400);
    }

    return (ctx.status = 403);
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

async function updateDevicePlatformKey(ctx: CTX, next: Next) {
  const { releaseKey } = ctx.request.body;
  const { slug } = ctx.params;
  const { user } = ctx.state;

  try {
    const device = await DeviceService.getDeviceBySlug(slug, user);
    const version = await PlatformVersionService.getVersionByKey(releaseKey);

    if (version && device)
      return (ctx.body = await DeviceService.update(slug, { currentPlatformVersionId: version.id }));

    return (ctx.body = 404);
  } catch (error) {
    ErrorHandling(ctx, error);
  }
}

export default {
  getAllPaging,
  createNewVersion,
  deviceVerifyVersion,
  getById,
  editById,
  deleteById,
  verifyPlatformVersionKey,
  getDownloadVersionLink,
  downloadBinaryFile,
  updateDevicePlatformKey,
};

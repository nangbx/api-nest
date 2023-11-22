import { getManager, getRepository } from 'typeorm';
import { QueryPaging } from '../typing';
import { PlatformVersionEntity, UserEntity } from '../entities';
import { PlatformVersionMediaService, UserService } from '.';

export const getAllPaging = async ({ limit = 20, offset = 0 }: QueryPaging, user: UserEntity, search: string) => {
  const PlatformVersion = getRepository(PlatformVersionEntity);

  if (search && user.isAdmin) {
    const searchingUser = await UserService.getByEmail(search);

    if (!searchingUser) {
      return Promise.resolve([[], 0]);
    }

    return await PlatformVersion.findAndCount({
      take: limit,
      skip: offset,
      relations: ['medias', 'user'],
      order: {
        createdAt: 'DESC',
      },
      where: {
        userId: searchingUser.id,
      },
    });
  }

  return await PlatformVersion.findAndCount({
    take: limit,
    skip: offset,
    relations: ['medias', 'user'],
    order: {
      createdAt: 'DESC',
    },
    ...(user.isAdmin
      ? {}
      : {
          where: {
            userId: user.id,
          },
        }),
  });
};

async function getById(id: string | number) {
  const PlatformVersion = getRepository(PlatformVersionEntity);

  return await PlatformVersion.findOne({
    where: {
      id: +id,
    },
    relations: ['medias'],
  });
}

export async function saveNewPlatformVersion({
  description,
  name,
  releaseType,
  releaseKey,
  userId,
}: PlatformVersionEntity) {
  const PlatformVersion = getRepository(PlatformVersionEntity);

  return await PlatformVersion.save({ description, name, releaseType, releaseKey, userId });
}

async function editById(id: number, { description, name, releaseType, medias }: PlatformVersionEntity) {
  const PlatformVersion = getRepository(PlatformVersionEntity);

  let version: PlatformVersionEntity = null;

  getManager().transaction(async () => {
    await PlatformVersionMediaService.deleteMediaByVersionId(+id);
    version = await PlatformVersion.save({ id: +id, description, name, releaseType, medias });
  });

  return version;
}

async function getNewestVersionByUserId(userId: string) {
  const PlatformVersion = getRepository(PlatformVersionEntity);

  return (
    await PlatformVersion.find({
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
      take: 1,
      relations: ['medias'],
    })
  )[0];
}

async function deleteById(id: number) {
  const PlatformVersion = getRepository(PlatformVersionEntity);

  return await PlatformVersion.delete({ id: +id });
}

async function getVersionByKey(value: string) {
  const PlatformVersion = getRepository(PlatformVersionEntity);

  return await PlatformVersion.findOne({ releaseKey: value });
}

export default {
  getAllPaging,
  saveNewPlatformVersion,
  getNewestVersionByUserId,
  getById,
  editById,
  deleteById,
  getVersionByKey,
};

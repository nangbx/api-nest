import { getRepository } from 'typeorm';
import { BannerEntity } from '../entities';

export async function save(url: string) {
  const Banner = getRepository(BannerEntity);

  return await Banner.save({ url });
}

export async function deleteBanner(id: number) {
  const Banner = getRepository(BannerEntity);

  return await Banner.delete({ id });
}

export async function getAllBannerPaging(page: number, limit = 10) {
  const Banner = getRepository(BannerEntity);

  return await Banner.find({
    take: limit,
    skip: (page - 1) * 10,
    order: {
      createdAt: 'DESC',
    },
  });
}

export default { save, deleteBanner, getAllBannerPaging };

import { AuthTokenEntity, UserEntity } from '../entities';
import { getRepository } from 'typeorm';

const save = async ({ id }: UserEntity, accessToken: string, deviceToken: string) => {
  const Auth = getRepository(AuthTokenEntity);

  const auth = await Auth.findOne({ userId: id });

  if (auth) {
    return await Auth.save({ ...auth, userId: id, accessToken: accessToken, deviceToken });
  }

  return await Auth.save({ userId: id, accessToken: accessToken, deviceToken });
};

const getDeviceTokensByUser = async ({ id: userId }: UserEntity) => {
  const Auth = getRepository(AuthTokenEntity);

  return (
    await Auth.find({
      where: {
        userId,
      },
    })
  ).map((a) => a.deviceToken);
};

export default { save, getDeviceTokensByUser };

import { AuthTokenEntity, UserEntity } from '../entities';
import { getRepository, Like } from 'typeorm';
import bcrypt from 'bcryptjs';

const getAllPaging = async ({ limit, offset, email }: any) => {
  const User = getRepository(UserEntity);
  return await User.findAndCount({
    where: {
      email: Like(`%${email}%`),
    },
    skip: offset,
    take: limit,
    relations: ['devices'],
    order: {
      createdAt: 'DESC',
    },
  });
};

async function getById(id: string) {
  try {
    const User = getRepository(UserEntity);

    const user = await User.findOne(id, { relations: ['devices'] });

    return user;
  } catch (error) {
    console.log(error);
  }
}

const save = async (user: UserEntity) => {
  const User = getRepository(UserEntity);

  const salt = bcrypt.hashSync(user.password);

  return await User.save({ ...user, password: salt });
};

async function update(user: UserEntity) {
  const User = getRepository(UserEntity);

  return await User.save({ ...user });
}

async function removeToken(user: UserEntity) {
  const AuthToken = getRepository(AuthTokenEntity);

  return await AuthToken.delete({ userId: user.id });
}

async function getByEmail(email: string) {
  const User = getRepository(UserEntity);

  return await User.findOne({ email });
}

export default { getAllPaging, getById, save, update, removeToken, getByEmail };

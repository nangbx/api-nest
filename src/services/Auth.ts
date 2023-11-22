import { UserEntity } from '../entities';
import { getRepository } from 'typeorm';

const login = async ({ email }: { email: string }) => {
  const User = getRepository(UserEntity);

  const user = await User.findOne({
    select: ['email', 'password', 'id', 'isActive', 'reason'],
    where: {
      email,
    },
  });

  return user;
};

export default { login };

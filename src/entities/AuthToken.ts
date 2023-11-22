import UserEntity from '../entities/User';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'auth_tokens' })
export default class AuthToken {
  @PrimaryGeneratedColumn('increment')
  id?: string;

  @Column({ name: 'created_at' })
  createdAt?: string;

  @Column({ name: 'updated_at' })
  updatedAt?: string;

  @ManyToOne((type) => UserEntity, (user) => user.authTokens, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column({ name: 'user_id' })
  userId?: string;

  @Column({ name: 'access_token' })
  accessToken: string;

  @Column({ name: 'device_token' })
  deviceToken: string;
}

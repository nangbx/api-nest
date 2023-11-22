import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TableName } from '../utils';
import AuthToken from './AuthToken';
import Device from './Device';

@Entity({ name: TableName.User })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'nvarchar', name: 'first_name', nullable: false })
  firstName: string;

  @Column({ type: 'nvarchar', name: 'last_name', nullable: false })
  lastName: string;

  @Column({ type: 'boolean', name: 'is_admin', nullable: false, default: false })
  isAdmin?: boolean;

  @Column({ type: 'boolean', name: 'is_active', nullable: false, default: false })
  isActive?: boolean;
  @Column({ type: 'nvarchar', name: 'reason', nullable: true })
  reason?: string;

  @Column({ type: 'varchar', name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP' })
  createdAt?: string;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP' })
  updatedAt?: string;

  @OneToMany((type) => Device, (device) => device.user)
  devices?: Device[];

  @OneToMany((type) => AuthToken, (authToken) => authToken.user)
  authTokens?: AuthToken[];
}

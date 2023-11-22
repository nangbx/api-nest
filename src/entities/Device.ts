import AttributeEntity from '../entities/Attribute';
import UserEntity from '../entities/User';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TableName } from '../utils';
import PlatformVersionEntity from '../entities/PlatformVersion';

@Entity({ name: TableName.Device })
export default class Device {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'nvarchar' })
  name: string;

  @Column({ type: 'nvarchar', unique: true, nullable: false })
  slug: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'boolean', name: 'is_active', nullable: false, default: false })
  isActive?: boolean;

  @Column({ name: 'created_at' })
  createdAt?: string;

  @Column({ name: 'updated_at' })
  updatedAt?: string;

  @ManyToOne((type) => UserEntity, (user) => user.devices, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column({ name: 'user_id' })
  userId?: string;

  @OneToMany((type) => AttributeEntity, (attribute) => attribute.device)
  attributes?: AttributeEntity[];

  @ManyToOne((type) => PlatformVersionEntity, (version) => version.devices, { cascade: false, persistence: false })
  @JoinColumn({ name: 'current_platform_version_id' })
  platformVersion?: PlatformVersionEntity;

  @Column({ name: 'current_platform_version_id' })
  currentPlatformVersionId?: number;

  @Column({ name: 'allow_auto_update' })
  allowAutoUpdate?: boolean;
}

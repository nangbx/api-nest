import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { TableName } from '../utils';
import PlatformMediaEntity from '../entities/PlatformMedia';
import DeviceEntity from '../entities/Device';
import UserEntity from '../entities/User';

@Entity({ name: TableName.PlatformVersions })
export default class PlatformVersionEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'varchar', name: 'release_key', nullable: false, unique: true })
  releaseKey: string;

  @Column({ type: 'nvarchar', nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ name: 'release_type' })
  releaseType: PlatformVersionReleaseEnum;

  @OneToMany((type) => PlatformMediaEntity, (media) => media.platformVersion, { cascade: true })
  medias?: PlatformMediaEntity[];

  @OneToMany((type) => DeviceEntity, (device) => device.platformVersion)
  devices?: DeviceEntity[];

  @ManyToOne((type) => UserEntity, (user) => user.devices, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column({ name: 'user_id' })
  userId?: string;

  @Column({ name: 'created_at' })
  createdAt?: string;

  @Column({ name: 'updated_at' })
  updatedAt?: string;
}

export enum PlatformVersionReleaseEnum {
  STABLE = 'STABLE',
  BETA = 'BETA',
}

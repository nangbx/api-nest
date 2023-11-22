import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TableName } from '../utils';
import PlatformVersion from './PlatformVersion';

@Entity({ name: TableName.PlatformVersionMedias })
export default class PlatformMediaEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'nvarchar', name: 'file_name', nullable: false })
  fileName: string;

  @Column({ type: 'varchar', name: 'file_path', nullable: false })
  filePath: string;

  @Column({ name: 'created_at' })
  createdAt?: string;

  @Column({ name: 'updated_at' })
  updatedAt?: string;

  @ManyToOne((type) => PlatformVersion, (version) => version.id)
  @JoinColumn({ name: 'version_id' })
  platformVersion?: PlatformMediaEntity;

  @Column({ name: 'version_id' })
  versionId?: number;
}

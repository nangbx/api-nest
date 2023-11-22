import DeviceEntity from '../entities/Device';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TableName } from '../utils';
import AttributeValue from './AttributeValue';
import { AttributeDataType } from '../typing/Input';

@Entity({ name: TableName.Attribute })
export default class Attribute {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'nvarchar', nullable: false })
  name: string;

  @Column({ type: 'nvarchar', unique: true, nullable: false })
  slug: string;

  @Column({ type: 'nvarchar', name: 'data_type', nullable: false })
  dataType: AttributeDataType;

  @Column({ type: 'nvarchar', name: 'data_label', nullable: false })
  dataLabel: string;
  max?: number;
  min?: number;
  lastActive?: string;
  totalRecord?: number;

  @Column({ type: 'boolean', name: 'is_active', nullable: false, default: false })
  isActive?: boolean;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP' })
  createdAt?: string;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP' })
  updatedAt?: string;

  @ManyToOne((type) => DeviceEntity, (device) => device.attributes, { cascade: true })
  @JoinColumn({ name: 'device_id' })
  device?: DeviceEntity;

  @Column({ name: 'device_id' })
  deviceId?: string;

  values?: AttributeValue[];
}

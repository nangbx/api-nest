import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TableName } from '../utils';

@Entity({ name: TableName.Banner })
export default class Banner {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ type: 'nvarchar', name: 'url', nullable: false })
  url: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP' })
  createdAt?: string;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP' })
  updatedAt?: string;
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TableName } from '../utils';
import AttributeEntity from '../entities/Attribute';
import { AttributeDataType } from '../typing/Input';

export default class AttributeValue {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ManyToOne((type) => AttributeEntity, (attribute) => attribute.values, { cascade: true })
  @JoinColumn({ name: 'attribute_id' })
  attribute?: AttributeEntity;

  // attributeId: string;
  @Column({ name: 'attribute_id', nullable: false })
  attributeId: number;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP' })
  createdAt?: string;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP' })
  updatedAt?: string;

  value: AttributeDataType;
}

@Entity({ name: TableName.AttributeValueInteger })
export class AttributeValueInteger extends AttributeValue {
  @Column({ type: 'int', nullable: false })
  value: AttributeDataType;
}

@Entity({ name: TableName.AttributeValueFloat })
export class AttributeValueFloat extends AttributeValue {
  @Column({ type: 'float', nullable: false })
  value: AttributeDataType;
}

@Entity({ name: TableName.AttributeValueString })
export class AttributeValueString extends AttributeValue {
  @Column({ type: 'varchar', nullable: false })
  value: AttributeDataType;
}

@Entity({ name: TableName.AttributeValueBit })
export class AttributeValueBit extends AttributeValue {
  @Column({ type: 'enum', nullable: false })
  value: AttributeDataType;
}

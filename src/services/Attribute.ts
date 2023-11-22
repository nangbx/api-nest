/* eslint-disable no-case-declarations */
import {
  AttributeEntity,
  AttributeValueBit,
  AttributeValueFloat,
  AttributeValueInteger,
  AttributeValueString,
} from '../entities';
import { Between, getRepository } from 'typeorm';
import { AttributeDataType } from '../typing/Input';

async function saveRange(attributes: AttributeEntity[]) {
  const Attribute = getRepository(AttributeEntity);

  return await Attribute.save(attributes);
}

async function getAttributeBySlugName(slug: string) {
  const Attribute = getRepository(AttributeEntity);

  return await Attribute.findOne({
    where: {
      slug,
    },
  });
}

async function verifySlugExist(slug: string) {
  const Attribute = getRepository(AttributeEntity);

  return !!(await Attribute.findOne({ slug }));
}

async function insert({ id: attributeId, dataType }: AttributeEntity, value: AttributeDataType) {
  switch (dataType) {
    case AttributeDataType.BIT:
      const BitEntity = getRepository(AttributeValueBit);
      return await BitEntity.insert({ attributeId, value });

    case AttributeDataType.FLOAT:
      const FloatEntity = getRepository(AttributeValueFloat);
      return await FloatEntity.save({ attributeId, value });

    case AttributeDataType.INTEGER:
      const IntegerEntity = getRepository(AttributeValueInteger);
      return await IntegerEntity.save({ attributeId, value });

    case AttributeDataType.STRING:
      const StringEntity = getRepository(AttributeValueString);
      return await StringEntity.save({ attributeId, value });

    default:
      break;
  }
}

async function insertRange({ id: attributeId, dataType }: AttributeEntity, data: AttributeEntity[]) {
  switch (dataType) {
    case AttributeDataType.BIT:
      const BitEntity = getRepository(AttributeValueBit);
      return await BitEntity.save(data.map((d) => ({ ...d, attributeId })));

    case AttributeDataType.FLOAT:
      const FloatEntity = getRepository(AttributeValueFloat);
      return await FloatEntity.save(data.map((d) => ({ ...d, attributeId })));

    case AttributeDataType.INTEGER:
      const IntegerEntity = getRepository(AttributeValueInteger);
      return await IntegerEntity.save(data.map((d) => ({ ...d, attributeId })));

    case AttributeDataType.STRING:
      const StringEntity = getRepository(AttributeValueString);
      return await StringEntity.save(data.map((d) => ({ ...d, attributeId })));

    default:
      break;
  }
}

async function getAttributeFrequentlyValue({ id: attributeId, dataType }: AttributeEntity, from: string, to: string) {
  switch (dataType) {
    case AttributeDataType.BIT:
      const BitEntity = getRepository(AttributeValueBit);
      return await BitEntity.createQueryBuilder('attribute_value')
        .select('attribute_value.value', 'value')
        .addSelect('Count(attribute_value.value)', 'count')
        .where('attribute_value.attributeId=' + attributeId)
        .andWhere('attribute_value.createdAt >= :from', { from })
        .andWhere('attribute_value.createdAt <= :to', { to })
        // .innerJoin('attribute.attribute', 'attributes')
        .groupBy('attribute_value.value')
        .orderBy('attribute_value.value')
        .getRawMany<{ count: string; value: number }>();

    case AttributeDataType.FLOAT:
      const FloatEntity = getRepository(AttributeValueFloat);
      return await FloatEntity.createQueryBuilder('attribute_value')
        .select('attribute_value.value', 'value')
        .where('attribute_value.attributeId=' + attributeId)
        .andWhere('attribute_value.createdAt >= :from', { from })
        .andWhere('attribute_value.createdAt <= :to', { to })
        .addSelect('Count(attribute_value.value)', 'count')
        // .innerJoin('attribute.attribute', 'attributes')
        .groupBy('attribute_value.value')
        .orderBy('attribute_value.value')
        .getRawMany<{ count: string; value: number }>();

    case AttributeDataType.INTEGER:
      const IntegerEntity = getRepository(AttributeValueInteger);
      return await IntegerEntity.createQueryBuilder('attribute_value')
        .select('attribute_value.value', 'value')
        .where('attribute_value.attributeId=' + attributeId)
        .andWhere('attribute_value.createdAt >= :from', { from })
        .andWhere('attribute_value.createdAt <= :to', { to })
        .addSelect('Count(attribute_value.value)', 'count')
        // .innerJoin('attribute.attribute', 'attributes')
        .groupBy('attribute_value.value')
        .orderBy('attribute_value.value')
        .getRawMany<{ count: string; value: number }>();

    case AttributeDataType.STRING:
      const StringEntity = getRepository(AttributeValueString);
      return await StringEntity.createQueryBuilder('attribute_value')
        .select('attribute_value.value', 'value')
        .where('attribute_value.attributeId=' + attributeId)
        .andWhere('attribute_value.createdAt >= :from', { from })
        .andWhere('attribute_value.createdAt <= :to', { to })
        .addSelect('Count(attribute_value.value)', 'count')
        // .innerJoin('attribute.attribute', 'attributes')
        .groupBy('attribute_value.value')
        .orderBy('attribute_value.value')
        .getRawMany<{ count: string; value: number }>();

    default:
      break;
  }
}

async function getAttributeValueFilter(
  { id: attributeId, dataType }: AttributeEntity,
  { from, to }: { from: string; to: string },
) {
  switch (dataType) {
    case AttributeDataType.BIT:
      const BitEntity = getRepository(AttributeValueBit);
      return await BitEntity.find({
        where: {
          attributeId,
          createdAt: Between(from, to),
        },
        order: {
          createdAt: 'DESC',
        },
      });

    case AttributeDataType.FLOAT:
      const FloatEntity = getRepository(AttributeValueFloat);
      return FloatEntity.find({
        where: {
          attributeId,
          createdAt: Between(from, to),
        },
        order: {
          createdAt: 'DESC',
        },
      });

    case AttributeDataType.INTEGER:
      const IntegerEntity = getRepository(AttributeValueInteger);
      return await IntegerEntity.find({
        where: {
          attributeId,
          createdAt: Between(from, to),
        },
        order: {
          createdAt: 'DESC',
        },
      });

    case AttributeDataType.STRING:
      const StringEntity = getRepository(AttributeValueString);
      return await StringEntity.find({
        where: {
          attributeId,
          createdAt: Between(from, to),
        },
        order: {
          createdAt: 'DESC',
        },
      });

    default:
      break;
  }
}

async function getAttributeValuePaging(
  { id: attributeId, dataType }: AttributeEntity,
  { page, from, to }: { page: number; from: string; to: string },
) {
  switch (dataType) {
    case AttributeDataType.BIT:
      const BitEntity = getRepository(AttributeValueBit);
      return await BitEntity.createQueryBuilder('attribute_value')
        .where('attribute_value.attributeId = :id', { id: attributeId })
        .andWhere('attribute_value.createdAt >= :from', { from })
        .andWhere('attribute_value.createdAt <= :to', { to })
        .limit(10)
        .offset(page - 1)
        .addOrderBy('attribute_value.createdAt', 'DESC')
        .getManyAndCount();

    case AttributeDataType.FLOAT:
      const FloatEntity = getRepository(AttributeValueFloat);
      return await FloatEntity.createQueryBuilder('attribute_value')
        .where('attribute_value.attributeId=' + attributeId)
        .andWhere('attribute_value.createdAt >= :from', { from })
        .andWhere('attribute_value.createdAt <= :to', { to })
        .limit(10)
        .offset(page - 1)
        .addOrderBy('attribute_value.createdAt', 'DESC')
        .getManyAndCount();

    case AttributeDataType.INTEGER:
      const IntegerEntity = getRepository(AttributeValueInteger);
      return await IntegerEntity.createQueryBuilder('attribute_value')
        .where('attribute_value.attributeId=' + attributeId)
        .andWhere('attribute_value.createdAt >= :from', { from })
        .andWhere('attribute_value.createdAt <= :to', { to })
        .limit(10)
        .offset(page - 1)
        .addOrderBy('attribute_value.createdAt', 'DESC')
        .getManyAndCount();

    case AttributeDataType.STRING:
      const StringEntity = getRepository(AttributeValueString);
      return await StringEntity.createQueryBuilder('attribute_value')
        .where('attribute_value.attributeId=' + attributeId)
        .andWhere('attribute_value.createdAt >= :from', { from })
        .andWhere('attribute_value.createdAt <= :to', { to })
        .limit(10)
        .offset(page - 1)
        .addOrderBy('attribute_value.createdAt', 'DESC')
        .getManyAndCount();

    default:
      break;
  }
}

async function getAttributeMeta(name: string) {
  const attribute = await getAttributeBySlugName(name);

  switch (attribute.dataType) {
    case AttributeDataType.BIT:
      const BitEntity = getRepository(AttributeValueBit);
      return {
        ...attribute,
        ...(await BitEntity.createQueryBuilder('attribute_value')
          .select('MAX(attribute_value.createdAt)', 'lastActive')
          .addSelect('MAX(attribute_value.value)', 'max')
          .addSelect('MIN(attribute_value.value)', 'min')
          .addSelect('COUNT(*)', 'totalRecord')
          .where('attribute_value.attributeId = :id', { id: attribute.id })
          .getRawOne()),
      };

    case AttributeDataType.FLOAT:
      const FloatEntity = getRepository(AttributeValueFloat);
      return {
        ...attribute,
        ...(await FloatEntity.createQueryBuilder('attribute_value')
          .select('MAX(attribute_value.createdAt)', 'lastActive')
          .addSelect('MAX(attribute_value.value)', 'max')
          .addSelect('MIN(attribute_value.value)', 'min')
          .addSelect('COUNT(*)', 'totalRecord')
          .where('attribute_value.attributeId = :id', { id: attribute.id })
          .getRawOne()),
      };

    case AttributeDataType.INTEGER:
      const IntegerEntity = getRepository(AttributeValueInteger);
      return {
        ...attribute,
        ...(await IntegerEntity.createQueryBuilder('attribute_value')
          .select('MAX(attribute_value.createdAt)', 'lastActive')
          .addSelect('MAX(attribute_value.value)', 'max')
          .addSelect('MIN(attribute_value.value)', 'min')
          .addSelect('COUNT(*)', 'totalRecord')
          .where('attribute_value.attributeId = :id', { id: attribute.id })
          .getRawOne()),
      };

    case AttributeDataType.STRING:
      const StringEntity = getRepository(AttributeValueString);
      return {
        ...attribute,
        ...(await StringEntity.createQueryBuilder('attribute_value')
          .select('MAX(attribute_value.createdAt)', 'lastActive')
          .where('attribute_value.attributeId = :id', { id: attribute.id })
          .getRawOne()),
      };

    default:
      break;
  }
}

async function update({ id, slug, name, dataLabel, dataType, isActive = true }: AttributeEntity) {
  const Attribute = getRepository(AttributeEntity);

  return await Attribute.save({ id, slug, name, dataLabel, dataType, isActive });
}

async function deleteAttribute(id: number) {
  const Attribute = getRepository(AttributeEntity);

  return await Attribute.delete({ id });
}

export default {
  saveRange,
  verifySlugExist,
  getAttributeBySlugName,
  insert,
  getAttributeFrequentlyValue,
  getAttributeValuePaging,
  getAttributeMeta,
  update,
  deleteAttribute,
  insertRange,
  getAttributeValueFilter,
};

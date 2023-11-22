import { AttributeEntity, DeviceEntity, PlatformVersionEntity, UserEntity } from '../entities';
import * as yup from 'yup';
import { AttributeDataType } from '../typing/Input';
import PlatformMediaEntity from '../entities/PlatformMedia';
import { PlatformVersionReleaseEnum } from '../entities/PlatformVersion';

export const userSchema = yup.object().shape<UserEntity>({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  isAdmin: yup.boolean(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  deviceToken: yup.string(),
});

export const deviceSchema = yup.object().shape<DeviceEntity>({
  name: yup.string().required(),
  image: yup.string().required(),
  slug: yup.string().required(),
  attributes: yup
    .array(
      yup.object().shape<AttributeEntity>({
        dataType: yup.mixed<AttributeDataType, object>().required(),
        name: yup.string().required(),
        dataLabel: yup.string().required(),
        slug: yup.string().required(),
      }),
    )
    .required(),
});

export const platformVersionSchema = yup.object().shape<PlatformVersionEntity>({
  description: yup.string().required(),
  name: yup.string().required(),
  releaseKey: yup
    .string()
    .matches(new RegExp(/^[a-zA-Z0-9_.-]*$/), `Only letter, number, '_', '.' and '-' is allowed!`)
    .required(),
  releaseType: yup.mixed<PlatformVersionReleaseEnum, object>().required(),
  medias: yup.array(
    yup.object().shape<PlatformMediaEntity>({
      fileName: yup.string().required(),
      filePath: yup.string().required(),
    }),
  ),
});

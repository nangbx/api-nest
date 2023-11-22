export interface LoginInput {
  email: string;
  password: string;
}

export interface DeviceEditInput {
  name?: string;

  slug?: string;

  image?: string;
  allowAutoUpdate?: boolean;
  currentPlatformVersionId?: number;
}

export enum AttributeDataType {
  FLOAT = 'FLOAT',
  INTEGER = 'INTEGER',
  STRING = 'STRING',
  BIT = 'BIT',
}

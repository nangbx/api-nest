import { getRepository } from 'typeorm';
import { PlatformVersionMediaEntity } from '../entities';

export async function saveVersionMedias(input: PlatformVersionMediaEntity[]) {
  const VersionMedia = getRepository(PlatformVersionMediaEntity);

  return await VersionMedia.save(
    input.map((item) => ({ fileName: item.fileName, filePath: item.filePath, versionId: item.versionId })),
  );
}

async function getVersionMediaByVersionId(versionId: number) {
  const VersionMedia = getRepository(PlatformVersionMediaEntity);

  return await VersionMedia.find({ versionId });
}

async function deleteMediaByVersionId(versionId: number) {
  const VersionMedia = getRepository(PlatformVersionMediaEntity);
  return await VersionMedia.delete({ versionId: +versionId });
}

export default { saveVersionMedias, getVersionMediaByVersionId, deleteMediaByVersionId };

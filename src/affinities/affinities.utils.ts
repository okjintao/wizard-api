import { reader } from '../aws/dynamodb.utils';
import { Affinity } from './affinity';

export async function queryAffinity(id: number): Promise<Affinity | null> {
  for await (const affinity of reader.query(
    Affinity,
    {
      id,
    },
    { limit: 1 },
  )) {
    return affinity;
  }
  return null;
}

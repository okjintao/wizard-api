import { reader } from '../aws/dynamodb.utils';
import { Trait } from './trait';

export async function queryTrait(id: number): Promise<Trait | null> {
  for await (const trait of reader.query(
    Trait,
    {
      id,
    },
    { limit: 1 },
  )) {
    return trait;
  }
  return null;
}

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

export async function loadTraits(): Promise<Trait[]> {
  const traits = [];
  for await (const trait of reader.scan(
    Trait
  )) {
    traits.push(trait);
  }
  return traits;
}

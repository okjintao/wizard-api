import { reader } from '../aws/dynamodb.utils';
import { Wizard } from './wizard';

export async function queryWizard(id: number): Promise<Wizard | null> {
  for await (const wizard of reader.query(
    Wizard,
    {
      id,
    },
    { limit: 1 },
  )) {
    return wizard;
  }
  return null;
}

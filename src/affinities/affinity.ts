import { embed } from '@aws/dynamodb-data-mapper';
import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { AFFINITY_DATA } from '../config/constants';
import { Trait } from '../traits/trait';

@table(AFFINITY_DATA)
export class Affinity {
  @hashKey()
  id!: number;

  @attribute()
  name!: string;

  @attribute({ memberType: embed(Trait) })
  traits!: Array<Trait>;
}

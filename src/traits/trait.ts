import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { TRAIT_DATA } from '../config/constants';

@table(TRAIT_DATA)
export class Trait {
  @hashKey()
  id!: number;

  @attribute()
  name!: string;

  @attribute()
  type!: string;

  @attribute()
  frequency!: number;
}

import { embed } from '@aws/dynamodb-data-mapper';
import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { WIZARD_DATA } from '../config/constants';
import { Trait } from '../traits/trait';

@table(WIZARD_DATA)
export class Wizard {
  @hashKey({
    indexKeyConfigurations: {
      IndexWizardOnAffinity: 'RANGE',
    },
  })
  id!: number;

  @attribute({
    indexKeyConfigurations: {
      IndexWizardOnAffinity: 'HASH',
    },
  })
  affinityId!: number;

  @attribute()
  attenuation!: number;

  @attribute()
  name!: string;

  @attribute({ memberType: embed(Trait) })
  traits!: Array<Trait>;
}

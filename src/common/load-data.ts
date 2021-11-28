import { Affinity } from '../affinities/affinity';
import { getDataMapper } from '../aws/dynamodb.utils';
import { Trait } from '../traits/trait';
import { Wizard } from '../wizards/wizard';
import { load } from './fs.utils';

interface WizardMetadata {
  idx: string;
  name: string;
  background: string;
  body: string;
  familiar: string;
  head: string;
  prop: string;
  rune: string;
}

interface TraitMetadata {
  idx: string;
  trait: string;
  label: string;
}

interface AffinityMetadata {
  // well, that is annoying...
  idx: number;
  displayName: string;
  tags: {
    idx: string;
    name: string;
  }[];
  affinity: {
    idx: string;
    name: string;
  }[];
}

const NO_TRAIT = 7777;
const DATA_BASE_PATH = '/home/jintao/Documents/wizard-api/data';

async function loadWizardDatabase() {
  const wizardMetadata = load<WizardMetadata[]>(
    `${DATA_BASE_PATH}/wizards-layers.json`,
  );
  const traitsMetadata = load<TraitMetadata[]>(
    `${DATA_BASE_PATH}/wizards-traits.json`,
  );
  const affinitiesMetadata = load<AffinityMetadata[]>(
    `${DATA_BASE_PATH}/wizard-affinities.json`,
  );

  const mapper = getDataMapper();

  const traitData = Object.fromEntries(
    traitsMetadata.map((t) => [
      t.idx,
      Object.assign(new Trait(), {
        id: t.idx,
        name: t.label,
        type: t.trait,
        frequency: 0,
      }),
    ]),
  );

  const affinityEntities: Record<string, Affinity> = {};
  const traitMappings: Record<string, string[]> = {};

  for (const metadata of affinitiesMetadata) {
    const trait = traitData[metadata.idx];

    for (const tag of metadata.tags) {
      if (!affinityEntities[tag.idx]) {
        affinityEntities[tag.idx] = Object.assign(new Affinity(), {
          id: Number(tag.idx),
          name: tag.name,
          traits: [],
        });
      }
      affinityEntities[tag.idx].traits.push(trait);
    }

    for (const affinity of metadata.affinity) {
      if (!affinityEntities[affinity.idx]) {
        affinityEntities[affinity.idx] = Object.assign(new Affinity(), {
          id: Number(affinity.idx),
          name: affinity.name,
          traits: [],
        });
      }
      affinityEntities[affinity.idx].traits.push(trait);
    }

    traitMappings[metadata.idx] = [
      ...new Set(
        metadata.tags.concat(metadata.affinity).map((item) => item.idx),
      ),
    ];
  }

  for await (const _item of mapper.batchPut(Object.values(affinityEntities))) {
  }

  const traitFrequency: Record<string, number> = {};

  const updateFrequency = (id: string) => {
    if (!traitFrequency[id]) {
      traitFrequency[id] = 0;
    }
    traitFrequency[id]++;
  };

  const wizardData = wizardMetadata.map((w) => {
    const traits = [w.background, w.body, w.familiar, w.head, w.prop, w.rune];
    const affMapping: Record<string, number> = {};
    traits.forEach((trait) => {
      if (Number(trait) === NO_TRAIT) {
        return;
      }
      updateFrequency(trait);
      traitMappings[trait].forEach((t) => {
        if (!affMapping[t]) {
          affMapping[t] = 0;
        }
        affMapping[t]++;
      });
    });
    const maxAffinity = Object.entries(affMapping).sort(
      (a, b) => b[1] - a[1],
    )[0];
    const traitCount = traits
      .slice(1)
      .filter((t) => Number(t) !== NO_TRAIT).length;
    return Object.assign(new Wizard(), {
      id: w.idx,
      affinityId: maxAffinity[0],
      attenuation: ((maxAffinity[1] / traitCount) * 100).toFixed(),
      name: w.name,
      traits: traits.map((t) => traitData[t]),
    });
  });

  Object.entries(traitFrequency).forEach((e) => {
    if (Number(e[0]) === NO_TRAIT) {
      return;
    }
    traitData[e[0]].frequency = e[1];
  });
  for await (const _item of mapper.batchPut(Object.values(wizardData))) {
  }
  for await (const _item of mapper.batchPut(
    Object.values(Object.values(traitData)),
  )) {
  }
}

loadWizardDatabase();

import { Controller, Get, PathParams, UseCache } from '@tsed/common';
import { NotFound } from '@tsed/exceptions';
import { Trait } from './trait';
import { loadTraits, queryTrait } from './traits.utils';

@Controller('/traits')
export class TraitsController {
  @Get('')
  @UseCache()
  async getTraits(): Promise<Record<string, Trait>> {
    const traits = await loadTraits();
    return Object.fromEntries(traits.map((t) => [t.id, t]));
  }

  @Get('/:id')
  async getTrait(@PathParams('id') id: number): Promise<Trait> {
    const trait = await queryTrait(id);
    if (!trait) {
      throw new NotFound(`Trait ${id} does not exist!`);
    }
    return trait;
  }
}

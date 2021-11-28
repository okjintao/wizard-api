import { Controller, Get, PathParams } from '@tsed/common';
import { NotFound } from '@tsed/exceptions';
import { Trait } from './trait';
import { queryTrait } from './traits.utils';

@Controller('/traits')
export class TraitsController {
  @Get('/:id')
  async getTrait(@PathParams('id') id: number): Promise<Trait> {
    const trait = await queryTrait(id);
    if (!trait) {
      throw new NotFound(`Trait ${id} does not exist!`);
    }
    return trait;
  }
}

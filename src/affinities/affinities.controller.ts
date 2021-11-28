import { Controller, Get, PathParams } from '@tsed/common';
import { NotFound } from '@tsed/exceptions';
import { queryAffinity } from './affinities.utils';
import { Affinity } from './affinity';

@Controller('/affinities')
export class AffinitiesController {
  @Get('/:id')
  async getAffinity(@PathParams('id') id: number): Promise<Affinity> {
    const affinity = await queryAffinity(id);
    if (!affinity) {
      throw new NotFound(`Affinity ${id} does not exist!`);
    }
    return affinity;
  }
}

import { Controller, Get, PathParams } from '@tsed/common';
import { NotFound } from '@tsed/exceptions';
import { Wizard } from './wizard';
import { queryWizard } from './wizards.utils';

@Controller('/wizards')
export class WziardsController {
  @Get('/:id')
  async getWizard(@PathParams('id') id: number): Promise<Wizard> {
    const wizard = await queryWizard(id);
    if (!wizard) {
      throw new NotFound(`Wizard ${id} does not exist!`);
    }
    return wizard;
  }
}

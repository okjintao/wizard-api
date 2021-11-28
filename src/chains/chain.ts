import { PROD } from '../config/constants';
import { Chain } from './config/chain.config';
import { Ethereum } from './config/eth.config';
import { Rinkeby } from './config/rinkeby.config';
import { Ropsten } from './config/ropsten.config';

export const loadChains = (): Chain[] => {
  return [new Ethereum(), new Ropsten(), new Rinkeby()];
};

export const DEFAULT_CHAIN = PROD ? new Ethereum() : new Rinkeby();

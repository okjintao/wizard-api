import RPC from '../../config/rpc.config';
import { ChainNetwork } from '../enums/chain-network.enum';
import { Chain } from './chain.config';

export class Rinkeby extends Chain {
  constructor() {
    super(
      'Rinkeby',
      '0x4',
      ChainNetwork.Rinkeby,
      RPC[ChainNetwork.Rinkeby],
      'https://api-rinkeby.etherscan.io/api',
    );
  }
}

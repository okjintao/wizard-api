import RPC from '../../config/rpc.config';
import { ChainNetwork } from '../enums/chain-network.enum';
import { Chain } from './chain.config';

export class Ropsten extends Chain {
  constructor() {
    super(
      'Ropsten',
      '0x3',
      ChainNetwork.Ropsten,
      RPC[ChainNetwork.Ropsten],
      'https://api-ropsten.etherscan.io/api',
    );
  }
}

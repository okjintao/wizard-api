import rpc from '../../config/rpc.config';
import { ChainNetwork } from '../enums/chain-network.enum';
import { Chain } from './chain.config';

export class Ethereum extends Chain {
  constructor() {
    super(
      'Ethereum',
      '0x01',
      ChainNetwork.Ethereum,
      rpc[ChainNetwork.Ethereum],
      'https://api.etherscan.io/api',
    );
  }
}

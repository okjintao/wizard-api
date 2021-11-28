import { BadRequest } from '@tsed/exceptions';
import { ethers } from 'ethers';
import { ChainNetwork } from '../enums/chain-network.enum';

type Chains = Record<string, Chain>;

export abstract class Chain {
  private static chains: Chains = {};
  readonly name: string;
  readonly chainId: string;
  readonly network: ChainNetwork;
  readonly etherscanApi: string;
  readonly provider: ethers.providers.JsonRpcProvider;
  readonly batchProvider: ethers.providers.JsonRpcBatchProvider;

  constructor(
    name: string,
    chainId: string,
    network: ChainNetwork,
    rpcUrl: string,
    etherscanApi: string,
  ) {
    this.name = name;
    this.chainId = chainId;
    this.network = network;
    this.etherscanApi = etherscanApi;
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.batchProvider = new ethers.providers.JsonRpcBatchProvider(rpcUrl);
    Chain.register(this.network, this);
  }

  static register(network: ChainNetwork, chain: Chain): void {
    Chain.chains[network] = chain;
  }

  static getChain(network?: ChainNetwork): Chain {
    if (!network) {
      network = ChainNetwork.Ethereum;
    }
    const chain = this.chains[network];
    if (!chain) {
      throw new BadRequest(`${network} is not a supported chain`);
    }
    return chain;
  }
}

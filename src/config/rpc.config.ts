import { ChainNetwork } from '../chains/enums/chain-network.enum';
import { Provider } from '../chains/enums/provider.enum';

export const DEFAULT_RPC = {
  [ChainNetwork.Ethereum]: Provider.Ethereum,
  [ChainNetwork.Ropsten]: Provider.Ropsten,
};

const RPC = {
  [ChainNetwork.Ethereum]: Provider.Ethereum,
  [ChainNetwork.Ropsten]: Provider.Ropsten,
  [ChainNetwork.Rinkeby]: Provider.Rinkeby,
};

export default RPC;

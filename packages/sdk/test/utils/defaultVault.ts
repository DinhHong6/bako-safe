import { Provider, bn } from 'fuels';
import { IPayloadVault, Vault } from '../../src/vault';
import { rootWallet } from './rootWallet';
import { sendPredicateCoins } from './sendCoins';
import { IBSAFEAuth } from '../../src/api';

export const newVault = async (
  signers: string[],
  fuelProvider: Provider,
  auth?: IBSAFEAuth,
) => {
  const VaultPayload: IPayloadVault = {
    configurable: {
      SIGNATURES_COUNT: 3,
      SIGNERS: signers,
      network: fuelProvider.url,
      chainId: fuelProvider.getChainId(),
    },
    provider: fuelProvider,
    BSAFEAuth: auth,
  };
  const vault = await Vault.create(VaultPayload);
  await sendPredicateCoins(vault!, bn(1_000_000_000), 'sETH', rootWallet);
  await sendPredicateCoins(vault!, bn(1_000_000_000), 'ETH', rootWallet);
  return vault;
};

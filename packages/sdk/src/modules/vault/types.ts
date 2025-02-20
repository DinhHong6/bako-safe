import { Provider, TransactionRequestLike } from 'fuels';
import { IBakoSafeAuth } from '../../api/auth/types';
import {
  IListTransactions,
  IPredicate,
  IPredicateService,
} from '../../api/predicates';
import { ITransferAsset } from '../../utils/assets';
import { IFormatTransfer, Transfer } from '../transfers';
import { ITransactionResume, IWitnesses } from '../../api';
import { IPagination } from '../../api/utils/pagination';

export interface IConfVault {
  HASH_PREDICATE?: number[];
  SIGNATURES_COUNT: number;
  SIGNERS: string[];
  network: string;
  chainId: number;
}

export enum ECreationtype {
  IS_OLD = 'IS_OLD',
  IS_NEW = 'IS_NEW',
}

export interface ICreationOldVault {
  type: ECreationtype.IS_NEW;
  payload: IPayloadVault;
}

export interface ICreationNewVault {
  type: ECreationtype.IS_OLD;
  payload: IPayloadVault;
}

export type ICreation = ICreationOldVault | ICreationNewVault;

export interface ITransferList {
  [id: string]: Transfer;
}

export interface IInstanceNewTransfer {
  assets: ITransferAsset[];
  witnesses: string[];
}

export type IBakoSafeIncludeTransaction =
  | IFormatTransfer
  | TransactionRequestLike;

export interface IPayloadVault {
  configurable: IConfVault;
  provider: Provider;
  name?: string;
  description?: string;
  transactionRecursiveTimeout?: number;
  abi?: string;
  bytecode?: string;
  BakoSafeAuth?: IBakoSafeAuth;
  BakoSafeVaultId?: string;
  BakoSafeVault?: IPredicate;
  api?: IPredicateService;
}
export interface IBakoSafeApi extends IBakoSafeAuth {
  id?: string;
  predicateAddress?: string;
}
export interface IBakoSafeGetTransactions {
  resume: ITransactionResume;
  witnesses: IWitnesses[];
}
export interface IVault {
  getAbi: () => { [name: string]: unknown };
  getBin: () => string;
  getConfigurable: () => IConfVault;
  BakoSafeGetTransactions: (
    params?: IListTransactions,
  ) => Promise<IPagination<IBakoSafeGetTransactions>>;
  BakoSafeIncludeTransaction: (
    params: IBakoSafeIncludeTransaction,
  ) => Promise<Transfer>;
}

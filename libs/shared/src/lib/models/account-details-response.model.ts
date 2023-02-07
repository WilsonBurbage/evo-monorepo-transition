import { Account } from './account.model';
import { Organisation } from './organisation.model';

export interface AccountDetailsResponse {
  account: Account;
  organisation: Organisation;
}

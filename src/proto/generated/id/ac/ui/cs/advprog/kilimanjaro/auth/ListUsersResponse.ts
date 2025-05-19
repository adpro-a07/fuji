// Original file: public/assets/proto/auth.proto

import type { ResponseStatus as _id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus, ResponseStatus__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/ResponseStatus';
import type { UserData as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserData, UserData__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserData__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserData';

export interface ListUsersResponse {
  'status'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus | null);
  'users'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserData)[];
  'totalCount'?: (number);
  'totalPages'?: (number);
  'currentPage'?: (number);
}

export interface ListUsersResponse__Output {
  'status': (_id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus__Output | null);
  'users': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserData__Output)[];
  'totalCount': (number);
  'totalPages': (number);
  'currentPage': (number);
}

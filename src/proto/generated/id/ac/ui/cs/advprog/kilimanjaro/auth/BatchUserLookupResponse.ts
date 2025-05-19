// Original file: public/assets/proto/auth.proto

import type { ResponseStatus as _id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus, ResponseStatus__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/ResponseStatus';
import type { UserLookupResult as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResult, UserLookupResult__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResult__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserLookupResult';

export interface BatchUserLookupResponse {
  'status'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus | null);
  'results'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResult)[];
  'totalFound'?: (number);
  'totalNotFound'?: (number);
}

export interface BatchUserLookupResponse__Output {
  'status': (_id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus__Output | null);
  'results': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResult__Output)[];
  'totalFound': (number);
  'totalNotFound': (number);
}

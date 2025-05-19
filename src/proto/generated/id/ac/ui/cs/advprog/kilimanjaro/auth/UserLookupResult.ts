// Original file: public/assets/proto/auth.proto

import type { UserIdentifier as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentifier, UserIdentifier__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentifier__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserIdentifier';
import type { UserData as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserData, UserData__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserData__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserData';
import type { ErrorDetail as _id_ac_ui_cs_advprog_kilimanjaro_auth_ErrorDetail, ErrorDetail__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_ErrorDetail__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/ErrorDetail';

export interface UserLookupResult {
  'requestedIdentifier'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentifier | null);
  'found'?: (boolean);
  'userData'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserData | null);
  'error'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_ErrorDetail | null);
}

export interface UserLookupResult__Output {
  'requestedIdentifier': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentifier__Output | null);
  'found': (boolean);
  'userData': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserData__Output | null);
  'error': (_id_ac_ui_cs_advprog_kilimanjaro_auth_ErrorDetail__Output | null);
}

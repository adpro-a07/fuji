// Original file: public/assets/proto/auth.proto

import type { UserData as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserData, UserData__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserData__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserData';
import type { ErrorDetail as _id_ac_ui_cs_advprog_kilimanjaro_auth_ErrorDetail, ErrorDetail__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_ErrorDetail__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/ErrorDetail';

export interface TokenValidationResult {
  'token'?: (string);
  'valid'?: (boolean);
  'userData'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserData | null);
  'errors'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_ErrorDetail)[];
}

export interface TokenValidationResult__Output {
  'token': (string);
  'valid': (boolean);
  'userData': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserData__Output | null);
  'errors': (_id_ac_ui_cs_advprog_kilimanjaro_auth_ErrorDetail__Output)[];
}

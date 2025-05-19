// Original file: public/assets/proto/auth.proto

import type { RequestMetadata as _id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata, RequestMetadata__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/RequestMetadata';
import type { UserRole as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserRole, UserRole__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserRole__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserRole';

export interface ListUsersRequest {
  'metadata'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata | null);
  'role'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserRole);
  'pageSize'?: (number);
  'pageNumber'?: (number);
}

export interface ListUsersRequest__Output {
  'metadata': (_id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata__Output | null);
  'role': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserRole__Output);
  'pageSize': (number);
  'pageNumber': (number);
}

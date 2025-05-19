// Original file: public/assets/proto/auth.proto

import type { RequestMetadata as _id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata, RequestMetadata__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/RequestMetadata';

export interface UserLookupRequest {
  'metadata'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata | null);
  'userId'?: (string);
  'email'?: (string);
  'identifier'?: "userId"|"email";
}

export interface UserLookupRequest__Output {
  'metadata': (_id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata__Output | null);
  'userId'?: (string);
  'email'?: (string);
  'identifier'?: "userId"|"email";
}

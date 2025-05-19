// Original file: public/assets/proto/auth.proto

import type { RequestMetadata as _id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata, RequestMetadata__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/RequestMetadata';

export interface TokenRefreshRequest {
  'metadata'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata | null);
  'refreshToken'?: (string);
}

export interface TokenRefreshRequest__Output {
  'metadata': (_id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata__Output | null);
  'refreshToken': (string);
}

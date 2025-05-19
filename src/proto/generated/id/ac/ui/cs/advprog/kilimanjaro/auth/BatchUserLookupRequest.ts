// Original file: public/assets/proto/auth.proto

import type { RequestMetadata as _id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata, RequestMetadata__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/RequestMetadata';
import type { UserIdentifier as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentifier, UserIdentifier__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentifier__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserIdentifier';

export interface BatchUserLookupRequest {
  'metadata'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata | null);
  'identifiers'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentifier)[];
  'includeProfile'?: (boolean);
}

export interface BatchUserLookupRequest__Output {
  'metadata': (_id_ac_ui_cs_advprog_kilimanjaro_auth_RequestMetadata__Output | null);
  'identifiers': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentifier__Output)[];
  'includeProfile': (boolean);
}

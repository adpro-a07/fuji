// Original file: public/assets/proto/auth.proto

import type { UserIdentity as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentity, UserIdentity__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentity__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserIdentity';
import type { UserProfile as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserProfile, UserProfile__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserProfile__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserProfile';

export interface UserData {
  'identity'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentity | null);
  'profile'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserProfile | null);
}

export interface UserData__Output {
  'identity': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserIdentity__Output | null);
  'profile': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserProfile__Output | null);
}

// Original file: public/assets/proto/auth.proto

import type { UserRole as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserRole, UserRole__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserRole__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserRole';
import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../../../../../../../google/protobuf/Timestamp';

export interface UserIdentity {
  'id'?: (string);
  'role'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserRole);
  'email'?: (string);
  'fullName'?: (string);
  'phoneNumber'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp | null);
  'updatedAt'?: (_google_protobuf_Timestamp | null);
}

export interface UserIdentity__Output {
  'id': (string);
  'role': (_id_ac_ui_cs_advprog_kilimanjaro_auth_UserRole__Output);
  'email': (string);
  'fullName': (string);
  'phoneNumber': (string);
  'createdAt': (_google_protobuf_Timestamp__Output | null);
  'updatedAt': (_google_protobuf_Timestamp__Output | null);
}

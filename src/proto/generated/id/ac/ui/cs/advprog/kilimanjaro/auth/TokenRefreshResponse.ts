// Original file: public/assets/proto/auth.proto

import type { ResponseStatus as _id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus, ResponseStatus__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/ResponseStatus';
import type { Long } from '@grpc/proto-loader';

export interface TokenRefreshResponse {
  'status'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus | null);
  'accessToken'?: (string);
  'refreshToken'?: (string);
  'expiresIn'?: (number | string | Long);
}

export interface TokenRefreshResponse__Output {
  'status': (_id_ac_ui_cs_advprog_kilimanjaro_auth_ResponseStatus__Output | null);
  'accessToken': (string);
  'refreshToken': (string);
  'expiresIn': (string);
}

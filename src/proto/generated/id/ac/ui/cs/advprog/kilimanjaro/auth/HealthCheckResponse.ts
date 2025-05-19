// Original file: public/assets/proto/auth.proto


// Original file: public/assets/proto/auth.proto

export const _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse_ServingStatus = {
  SERVING_STATUS_UNKNOWN: 'SERVING_STATUS_UNKNOWN',
  SERVING_STATUS_SERVING: 'SERVING_STATUS_SERVING',
  SERVING_STATUS_NOT_SERVING: 'SERVING_STATUS_NOT_SERVING',
  SERVING_STATUS_SERVICE_UNKNOWN: 'SERVING_STATUS_SERVICE_UNKNOWN',
} as const;

export type _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse_ServingStatus =
  | 'SERVING_STATUS_UNKNOWN'
  | 0
  | 'SERVING_STATUS_SERVING'
  | 1
  | 'SERVING_STATUS_NOT_SERVING'
  | 2
  | 'SERVING_STATUS_SERVICE_UNKNOWN'
  | 3

export type _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse_ServingStatus__Output = typeof _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse_ServingStatus[keyof typeof _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse_ServingStatus]

export interface HealthCheckResponse {
  'status'?: (_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse_ServingStatus);
}

export interface HealthCheckResponse__Output {
  'status': (_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse_ServingStatus__Output);
}

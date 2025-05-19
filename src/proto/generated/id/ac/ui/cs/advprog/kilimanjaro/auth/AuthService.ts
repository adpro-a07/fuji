// Original file: public/assets/proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { BatchUserLookupRequest as _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, BatchUserLookupRequest__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/BatchUserLookupRequest';
import type { BatchUserLookupResponse as _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse, BatchUserLookupResponse__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/BatchUserLookupResponse';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../../../../../../../google/protobuf/Empty';
import type { HealthCheckResponse as _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse, HealthCheckResponse__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/HealthCheckResponse';
import type { TokenRefreshRequest as _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, TokenRefreshRequest__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/TokenRefreshRequest';
import type { TokenRefreshResponse as _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse, TokenRefreshResponse__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/TokenRefreshResponse';
import type { TokenValidationRequest as _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, TokenValidationRequest__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/TokenValidationRequest';
import type { TokenValidationResponse as _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse, TokenValidationResponse__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/TokenValidationResponse';
import type { UserLookupRequest as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, UserLookupRequest__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserLookupRequest';
import type { UserLookupResponse as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse, UserLookupResponse__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/UserLookupResponse';

export interface AuthServiceClient extends grpc.Client {
  BatchLookupUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output>): grpc.ClientUnaryCall;
  BatchLookupUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output>): grpc.ClientUnaryCall;
  BatchLookupUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output>): grpc.ClientUnaryCall;
  BatchLookupUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output>): grpc.ClientUnaryCall;
  batchLookupUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output>): grpc.ClientUnaryCall;
  batchLookupUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output>): grpc.ClientUnaryCall;
  batchLookupUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output>): grpc.ClientUnaryCall;
  batchLookupUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output>): grpc.ClientUnaryCall;
  
  CheckHealth(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  CheckHealth(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  CheckHealth(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  CheckHealth(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  checkHealth(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  checkHealth(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  checkHealth(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  checkHealth(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  
  LookupUser(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output>): grpc.ClientUnaryCall;
  LookupUser(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output>): grpc.ClientUnaryCall;
  LookupUser(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output>): grpc.ClientUnaryCall;
  LookupUser(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output>): grpc.ClientUnaryCall;
  lookupUser(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output>): grpc.ClientUnaryCall;
  lookupUser(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output>): grpc.ClientUnaryCall;
  lookupUser(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output>): grpc.ClientUnaryCall;
  lookupUser(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output>): grpc.ClientUnaryCall;
  
  RefreshToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output>): grpc.ClientUnaryCall;
  
  ValidateToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  BatchLookupUsers: grpc.handleUnaryCall<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse>;
  
  CheckHealth: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse>;
  
  LookupUser: grpc.handleUnaryCall<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse>;
  
  RefreshToken: grpc.handleUnaryCall<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse>;
  
  ValidateToken: grpc.handleUnaryCall<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  BatchLookupUsers: MethodDefinition<_id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest, _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse, _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_BatchUserLookupResponse__Output>
  CheckHealth: MethodDefinition<_google_protobuf_Empty, _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse, _google_protobuf_Empty__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_HealthCheckResponse__Output>
  LookupUser: MethodDefinition<_id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest, _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse, _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_UserLookupResponse__Output>
  RefreshToken: MethodDefinition<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest, _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse, _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenRefreshResponse__Output>
  ValidateToken: MethodDefinition<_id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest, _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse, _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_TokenValidationResponse__Output>
}

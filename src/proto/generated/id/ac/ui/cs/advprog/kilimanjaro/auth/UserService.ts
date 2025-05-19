// Original file: public/assets/proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetRandomTechnicianRequest as _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, GetRandomTechnicianRequest__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/GetRandomTechnicianRequest';
import type { GetRandomTechnicianResponse as _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse, GetRandomTechnicianResponse__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/GetRandomTechnicianResponse';
import type { ListUsersRequest as _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, ListUsersRequest__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/ListUsersRequest';
import type { ListUsersResponse as _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse, ListUsersResponse__Output as _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output } from '../../../../../../../id/ac/ui/cs/advprog/kilimanjaro/auth/ListUsersResponse';

export interface UserServiceClient extends grpc.Client {
  GetRandomTechnician(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output>): grpc.ClientUnaryCall;
  GetRandomTechnician(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output>): grpc.ClientUnaryCall;
  GetRandomTechnician(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output>): grpc.ClientUnaryCall;
  GetRandomTechnician(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output>): grpc.ClientUnaryCall;
  getRandomTechnician(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output>): grpc.ClientUnaryCall;
  getRandomTechnician(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output>): grpc.ClientUnaryCall;
  getRandomTechnician(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output>): grpc.ClientUnaryCall;
  getRandomTechnician(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output>): grpc.ClientUnaryCall;
  
  ListUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output>): grpc.ClientUnaryCall;
  ListUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output>): grpc.ClientUnaryCall;
  ListUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output>): grpc.ClientUnaryCall;
  ListUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output>): grpc.ClientUnaryCall;
  listUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output>): grpc.ClientUnaryCall;
  listUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output>): grpc.ClientUnaryCall;
  listUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output>): grpc.ClientUnaryCall;
  listUsers(argument: _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, callback: grpc.requestCallback<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  GetRandomTechnician: grpc.handleUnaryCall<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse>;
  
  ListUsers: grpc.handleUnaryCall<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  GetRandomTechnician: MethodDefinition<_id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest, _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse, _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_GetRandomTechnicianResponse__Output>
  ListUsers: MethodDefinition<_id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest, _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse, _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersRequest__Output, _id_ac_ui_cs_advprog_kilimanjaro_auth_ListUsersResponse__Output>
}

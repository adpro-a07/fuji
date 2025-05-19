import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthServiceClient as _id_ac_ui_cs_advprog_kilimanjaro_auth_AuthServiceClient, AuthServiceDefinition as _id_ac_ui_cs_advprog_kilimanjaro_auth_AuthServiceDefinition } from './id/ac/ui/cs/advprog/kilimanjaro/auth/AuthService';
import type { UserServiceClient as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserServiceClient, UserServiceDefinition as _id_ac_ui_cs_advprog_kilimanjaro_auth_UserServiceDefinition } from './id/ac/ui/cs/advprog/kilimanjaro/auth/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
      Timestamp: MessageTypeDefinition
    }
  }
  id: {
    ac: {
      ui: {
        cs: {
          advprog: {
            kilimanjaro: {
              auth: {
                AuthService: SubtypeConstructor<typeof grpc.Client, _id_ac_ui_cs_advprog_kilimanjaro_auth_AuthServiceClient> & { service: _id_ac_ui_cs_advprog_kilimanjaro_auth_AuthServiceDefinition }
                BatchUserLookupRequest: MessageTypeDefinition
                BatchUserLookupResponse: MessageTypeDefinition
                ErrorDetail: MessageTypeDefinition
                GetRandomTechnicianRequest: MessageTypeDefinition
                GetRandomTechnicianResponse: MessageTypeDefinition
                HealthCheckResponse: MessageTypeDefinition
                ListUsersRequest: MessageTypeDefinition
                ListUsersResponse: MessageTypeDefinition
                RequestMetadata: MessageTypeDefinition
                ResponseStatus: MessageTypeDefinition
                TokenRefreshRequest: MessageTypeDefinition
                TokenRefreshResponse: MessageTypeDefinition
                TokenValidationRequest: MessageTypeDefinition
                TokenValidationResponse: MessageTypeDefinition
                TokenValidationResult: MessageTypeDefinition
                UserData: MessageTypeDefinition
                UserIdentifier: MessageTypeDefinition
                UserIdentity: MessageTypeDefinition
                UserLookupRequest: MessageTypeDefinition
                UserLookupResponse: MessageTypeDefinition
                UserLookupResult: MessageTypeDefinition
                UserProfile: MessageTypeDefinition
                UserRole: EnumTypeDefinition
                UserService: SubtypeConstructor<typeof grpc.Client, _id_ac_ui_cs_advprog_kilimanjaro_auth_UserServiceClient> & { service: _id_ac_ui_cs_advprog_kilimanjaro_auth_UserServiceDefinition }
              }
            }
          }
        }
      }
    }
  }
}


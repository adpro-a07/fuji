import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { ProtoGrpcType } from "@/proto/generated/auth"
import { GRPC_CONFIG } from "./config"

// Singleton pattern to maintain a single instance of loaded proto definitions
class ProtoLoader {
  private static packageDefinition: protoLoader.PackageDefinition
  private static protoGrpcType: ProtoGrpcType

  public static getAuthPackage(): ProtoGrpcType {
    if (!this.packageDefinition) {
      this.packageDefinition = protoLoader.loadSync(GRPC_CONFIG.AUTH_SERVICE.PROTO_PATH, {
        defaults: true,
        oneofs: true,
        keepCase: false,
      })
    }

    if (!this.protoGrpcType) {
      this.protoGrpcType = grpc.loadPackageDefinition(this.packageDefinition) as unknown as ProtoGrpcType
    }

    return this.protoGrpcType
  }
}

// Get service definitions
const authPackage = ProtoLoader.getAuthPackage()
export const AuthServiceDefinition = authPackage.id.ac.ui.cs.advprog.kilimanjaro.auth.AuthService
export const UserServiceDefinition = authPackage.id.ac.ui.cs.advprog.kilimanjaro.auth.UserService

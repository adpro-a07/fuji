import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { ProtoGrpcType } from "@/proto/generated/auth"

const PROTO_PATH = "./proto/auth.proto"

// suggested options for similarity to loading grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  defaults: true,
  oneofs: true,
})

const authService = (grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType).id.ac.ui.cs.advprog
  .kilimanjaro.auth

export const { AuthService } = authService

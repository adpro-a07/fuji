import { ReactNode } from "react"
import { z } from "zod"
import { UUID } from "crypto"

import { loginFormSchema } from "@/modules/LoginPageModule/constant"
import { StructuredResponse } from "@/components/utils/customFetch/interface"

// Create enum for user role
export enum UserRole {
  ADMIN = "ADMIN",
  TECHNICIAN = "TECHNICIAN",
  CUSTOMER = "CUSTOMER",
}

export interface User {
  id: UUID
  email: string
  fullName: string
  phoneNumber: string
  role: UserRole
  address: string | null
  experience: string | null
  totalJobsDone: number | null
  totalIncome: number | null
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface AuthContextProviderProps {
  children: ReactNode
  user: User | null
}

export interface AuthContextInterface {
  user: User | null
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setStoredUser: React.Dispatch<React.SetStateAction<User | null>>
  login: (values: z.infer<typeof loginFormSchema>) => Promise<StructuredResponse<LoginResponse>>
}

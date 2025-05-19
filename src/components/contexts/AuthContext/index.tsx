"use client"

import { useRouter } from "next/navigation"
import React, { createContext, useContext, useState } from "react"
import { z } from "zod"
import { loginFormSchema } from "@/modules/LoginPageModule/constant"
import { loginAction } from "./actions"
import { AuthContextInterface, AuthContextProviderProps } from "./interface"

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children, user }) => {
  const router = useRouter()

  const [storedUser, setStoredUser] = useState(user)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function login(values: z.infer<typeof loginFormSchema>) {
    const response = await loginAction(values)

    if (response.success && response.data) {
      setIsAuthenticated(true)
      setStoredUser(response.data?.user)
      router.push("/")
      return response
    } else {
      setStoredUser(null)
      setIsAuthenticated(false)
      throw new Error(response.message)
    }
  }

  const contextValue = {
    user: storedUser,
    isAuthenticated,
    setIsAuthenticated,
    setStoredUser,
    login,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

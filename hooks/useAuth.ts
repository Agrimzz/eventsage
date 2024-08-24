// src/hooks/useAuth.ts
import { getAuthStatus } from "@/utils/auth"
import { useState, useEffect } from "react"

interface AuthStatus {
  loggedIn: boolean
  userId: string | null
  userEmail: string | null
}

export const useAuth = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loggedIn: false,
    userId: null,
    userEmail: null,
  })

  useEffect(() => {
    setAuthStatus(getAuthStatus())
  }, [])

  return authStatus
}

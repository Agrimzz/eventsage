// src/utils/auth.ts
export const getAuthStatus = () => {
  const userId = localStorage.getItem("id")
  const userEmail = localStorage.getItem("email")

  const loggedIn = !!(userId && userEmail)

  return {
    loggedIn,
    userId: userId || null,
    userEmail: userEmail || null,
  }
}

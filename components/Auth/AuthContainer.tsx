import { ReactNode } from "react"

export default function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-auth bg-cover bg-center">
      {children}
    </div>
  )
}

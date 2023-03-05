import AuthProvider from "../../components/Auth/AuthProvider"
import Register from "./Register"

export default function Page() {
  return (
    <AuthProvider>
      <Register />
    </AuthProvider>
  )
}

import { FaUserCircle } from "react-icons/fa"
import { useRouter } from "next/router"
import styled from "styled-components"
import { useUser } from "@auth0/nextjs-auth0"
import Image from "next/image"

export default function User() {
  const router = useRouter()
  const { user, error, isLoading } = useUser()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  if (!user) {
    return (
      <UserStyle>
        <FaUserCircle onClick={() => router.push("/api/auth/login")} />
        <p onClick={() => router.push("/api/auth/login")} className="profile">
          Log-In!
        </p>
      </UserStyle>
    )
  }
  if (user) {
    return (
      <UserStyle>
        <Image
          src={user.picture}
          alt="Picture of the user"
          width={50}
          height={50}
          className="profile"
          onClick={() => router.push("/profile")}
        />
        <p onClick={() => router.push("/api/auth/logout")} className="profile">
          Logout
        </p>
      </UserStyle>
    )
  }
}

const UserStyle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  .profile {
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 2rem;
    color: hotpink;
    margin: 0 0.5rem;
    :hover {
      color: #ff00ff;
    }
  }
  svg {
    font-size: 2rem;
    color: hotpink;
    :hover {
      color: #ff00ff;
    }
  }
`

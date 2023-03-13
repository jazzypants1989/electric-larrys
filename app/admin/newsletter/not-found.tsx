import Link from "next/link"
import Button from "../../../components/Layout/Button"

export default function Custom404() {
  return (
    <div className="mt-24 ml-24 flex flex-col items-center justify-center py-2 text-center">
      <h1 className="text-center text-4xl drop-shadow">
        No one is signed up for the newsletter yet!
      </h1>
      <p className="text-center text-lg drop-shadow">
        <Button>
          <Link href="/admin/users">Want to force them? 😈</Link>
        </Button>
      </p>
    </div>
  )
}

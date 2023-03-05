import Link from "next/link"

export default function Custom404() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center py-2 text-center">
      <h1 className="text-center text-4xl drop-shadow">
        Dang, that product doesn&apos;t exist yet!
      </h1>
      <p className="text-center text-lg drop-shadow">
        <Link className="primary-button" href="/admin/products">
          Want to create it?
        </Link>
      </p>
    </div>
  )
}

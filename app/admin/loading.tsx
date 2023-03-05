export default function Spinner() {
  return (
    <main
      aria-busy="true"
      className="flex h-screen w-screen items-center justify-center"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-b-4 border-orange font-extralight text-Yellow underline drop-shadow"
        role="status"
      >
        |___
      </div>
    </main>
  )
}

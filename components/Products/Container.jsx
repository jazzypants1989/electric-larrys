let Container = (props) => {
  const { children } = props
  return (
    <div className="flex items-center justify-center pl-7 py-4">
      <div className="w-full max-w-xs mx-auto">{children}</div>
    </div>
  )
}

export default Container

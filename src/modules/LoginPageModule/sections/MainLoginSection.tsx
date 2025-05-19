import { LoginForm } from "../module-elements/LoginForm"

export const MainLoginSection = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center rounded-2xl border-2 p-4">
          <div className="mb-2 text-2xl font-bold">Login</div>
          <div className="">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}

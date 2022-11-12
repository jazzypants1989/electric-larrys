import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useReducer, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import AdminSideBar from "../../../components/AdminSideBar"
import Layout from "../../../components/Layout"
import { getError } from "../../../utils/error"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" }
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" }
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload }

    default:
      return state
  }
}
export default function AdminUserEditScreen() {
  const [userValues, setUserValues] = useState({
    name: "",
    email: "",
    isAdmin: false,
  })
  const { query } = useRouter()
  const userId = query.id
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  })

  const { register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/admin/users/${userId}`)
        console.log(data)
        dispatch({ type: "FETCH_SUCCESS" })
        setValue("isEmployee", data.isEmployee)
        setValue("isAdmin", data.description)
        setValue("newsletter", data.newsletter)
        setValue("name", data.name)
        setValue("email", data.email)
        setValue("password", data.password)
        setUserValues({
          name: data.name,
          email: data.email,
          isAdmin: data.isAdmin,
        })
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) })
      }
    }

    fetchData()
  }, [setValue, userId])

  const router = useRouter()

  const submitHandler = async ({
    isEmployee,
    isAdmin,
    newsletter,
    name,
    email,
    password,
  }) => {
    if (email === "jessepence@gmail.com") {
      toast.error("How cute. You think you have real power here?")
      return
    }

    try {
      dispatch({ type: "UPDATE_REQUEST" })
      await axios.put(`/api/admin/users/${userId}`, {
        isEmployee,
        isAdmin,
        newsletter,
        name,
        email,
        password,
      })
      dispatch({ type: "UPDATE_SUCCESS" })
      toast.success("User updated. You are basically a god now.")
      router.push("/admin/users")
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) })
      toast.error(getError(err))
    }
  }

  return (
    <Layout title={`Editing ${userValues.name}`}>
      <div className="grid md:grid-cols-4 md:gap-5 drop-shadow">
        <AdminSideBar />
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">{`Edit ${userValues.name}`}</h1>
              <div className="mb-4">
                <h2 className="mb-2 text-lg">Email</h2>
                <h3 className="text-sm">{userValues.email}</h3>
                <fieldset>
                  <legend className="text-sm">Is Employee</legend>
                  <input
                    type="checkbox"
                    {...register("isEmployee")}
                    defaultChecked={userValues.isEmployee}
                  />
                </fieldset>
                <fieldset>
                  <legend className="text-sm">Is Admin</legend>
                  {userValues.email.toLowerCase() === "jessepence@gmail.com" ? (
                    <>
                      <input
                        type="checkbox"
                        {...register("isAdmin")}
                        defaultChecked={userValues.isAdmin}
                      />
                      <h1 className="inline pl-8 text-5xl text-Red">
                        ALWAYS AND FOREVER BITCHES!
                      </h1>
                      <span className="text-sm pl-2">Love you</span>
                    </>
                  ) : (
                    <input
                      type="checkbox"
                      defaultValue={false}
                      {...register("isAdmin")}
                    />
                  )}
                </fieldset>
                <fieldset>
                  <legend className="text-sm">Newsletter</legend>
                  <input
                    type="checkbox"
                    {...register("newsletter")}
                    defaultChecked={userValues.newsletter}
                  />
                </fieldset>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  {loadingUpdate ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  )
}

AdminUserEditScreen.auth = { adminOnly: true }

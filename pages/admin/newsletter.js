import { toast } from "react-toastify"
import { useReducer } from "react"
import { getError } from "../../utils/error"
import AdminSideBar from "../../components/AdminSideBar"
import Layout from "../../components/Layout"
import { useForm } from "react-hook-form"

function reducer(state, action) {
  switch (action.type) {
    case "SEND_REQUEST":
      return { ...state, loading: true, error: "" }
    case "SEND_SUCCESS":
      return { ...state, loading: false, error: "", success: true }
    case "SEND_FAIL":
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default function AdminNews() {
  const [{ loading, error, success }, dispatch] = useReducer(reducer, {
    success: false,
    loading: true,
    error: "",
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const sendEmail = async (data) => {
    try {
      console.log(data)
      dispatch({ type: "SEND_REQUEST" })
      const { user, subject, message, link, image } = data
      // Send email
      const mail = {
        user: user,
        subject: subject,
        message: message,
        link: link,
        image: image,
      }
      fetch("/api/admin/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mail),
      })
      dispatch({ type: "SEND_SUCCESS" })
      toast.success("Email sent successfully")
    } catch (error) {
      dispatch({ type: "SEND_FAIL", payload: getError(error) })
    }
  }

  return (
    <Layout title="Newsletter">
      <div className="grid justify-center items-center text-center md:grid-cols-4 md:gap-4 sm:grid-cols-1 sm:gap-4">
        <AdminSideBar />
        <div className="md:col-span-3 sm:col-span-1">
          <h1 className="text-2xl font-semibold">Newsletter</h1>
          <form
            onSubmit={handleSubmit(sendEmail)}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="user" className="text-xl font-semibold">
                User
              </label>
              <input
                type="text"
                id="user"
                placeholder="Enter name"
                className="border-2 border-gray-300 p-2 rounded-md"
                {...register("user", { required: true })}
              />
              {errors.user && (
                <span className="text-red-500">This field is required</span>
              )}
              <label htmlFor="subject" className="text-xl font-semibold">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Enter subject"
                className="border-2 border-gray-300 p-2 rounded-md"
                {...register("subject", { required: true })}
              />
              {errors.subject && (
                <span className="text-red-500">This field is required</span>
              )}
              <label htmlFor="link" className="text-xl font-semibold">
                Link
              </label>
              <input
                type="text"
                id="link"
                placeholder="Enter link"
                className="border-2 border-gray-300 p-2 rounded-md"
                {...register("link", { required: true })}
              />
              {errors.link && (
                <span className="text-red-500">This field is required</span>
              )}
              <label htmlFor="image" className="text-xl font-semibold">
                Image
              </label>
              <input
                type="text"
                id="image"
                placeholder="Enter image"
                className="border-2 border-gray-300 p-2 rounded-md"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-red-500">This field is required</span>
              )}
              <label htmlFor="message" className="text-xl font-semibold">
                Message
              </label>
              <textarea
                type="text"
                id="message"
                placeholder="Enter message"
                className="border-2 border-gray-300 p-2 rounded-md"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="text-red-500">This field is required</span>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md mt-4"
              >
                Send
              </button>

              {error && (
                <span className="text-red-500 text-center">{error}</span>
              )}

              {loading && <span className="text-blue-500">Sending...</span>}

              {success && (
                <span className="text-green-500 text-center">
                  Email sent successfully
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

AdminNews.auth = { adminOnly: true }

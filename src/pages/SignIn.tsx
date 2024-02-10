import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IAuth } from "../types";
import { useSignInMutation } from "../app/api/apiSlice";
import { useAppDispatch } from "../app/hook";
import { User, setUser } from "../app/features/userSlice";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/react.svg";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ signIn ] = useSignInMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>();

  const onSubmit = (data: IAuth) => {
    // console.log(data)
    signIn(data)
      .unwrap()
      .then((res) => {
        localStorage.setItem("token", res.token);
        const decoded = jwtDecode(res.token) as User;
        dispatch(setUser(decoded));
        toast.success("Login User Successfully");
        navigate("/");
      }).catch((err) => {
        console.log(err)
        localStorage.removeItem("token");
        dispatch(setUser(null));
        toast.error("Login User Failed");
      });
  };

  return (
    <div className="bg-white">
      {/* 
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <span>Password field is required</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password", { required: true })}
                  className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <span>Password field is required</span>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not have an account?{' '}
            <Link to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
          <p className="mt-5 text-center text-sm text-gray-500">
            Go back{' '}
            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

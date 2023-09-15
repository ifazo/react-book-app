import { useForm } from "react-hook-form"
import { useAppDispatch } from "../provider/hook";
import { createUser, googleLogin } from "../provider/features/userSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

interface IFormInput {
  name: string
  email: string
  password: string
}

export default function SignUp() {

  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

  const onSubmit = async (data: IFormInput) => {
    try {
      await dispatch(createUser({ name: data.name, email: data.email, password: data.password }));
      toast.loading("Loading...");
      const response = await axios.post('http://localhost:5000/user/create', {
          name: data.name,
          email: data.email,
          password: data.password
        });
      toast.success("User created successfully!");
      console.log(response);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleGoogleLogin = () => {
    void dispatch(googleLogin())
  }

  return (
    <div className="h-full bg-white">
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
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  placeholder="name"
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("name", { required: true })}
                />
                {errors.name && <span>Name field is required</span>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  placeholder="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>Email field is required</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forget password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  placeholder="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("password", { required: true })}
                />
                {errors.password && <span>Password field is required</span>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>

            <div>
              <button
                onClick={handleGoogleLogin}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up with Google
              </button>
            </div>

          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
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

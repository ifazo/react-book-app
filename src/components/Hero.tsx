import { Link } from "react-router-dom";

/* This example requires Tailwind CSS v2.0+ */
export default function Hero() {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block">Ready to Dive in?</span>
                    <span className="block text-indigo-600">Start to Explore Books.</span>
                </h2>
                <div className="mt-8 flex">
                    <div className="inline-flex rounded-md shadow">
                        <Link
                            to="/sign-up"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Get started
                        </Link>
                    </div>
                    <div className="ml-3 inline-flex">
                        <Link
                            to="/sign-in"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

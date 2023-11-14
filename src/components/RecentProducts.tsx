import { Link } from "react-router-dom"
import { IProduct } from "../types"
import { useGetRecentProductsQuery } from "../app/api/apiSlice"

export default function RecentProducts() {
  const { data } = useGetRecentProductsQuery({})
  console.log(data)
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:px-8">
        <div className="px-4 flex items-center justify-between sm:px-6 lg:px-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Recent products</h2>
          <a href="#" className="hidden sm:block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            See everything<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-8 relative">
          <div className="relative w-full pb-6 -mb-6 overflow-x-auto">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
            >
              {data?.map((product: IProduct) => (
                <li key={product._id} className="w-64 inline-flex flex-col text-center lg:w-auto">
                  <div className="group relative">
                    <div className="bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-6">
                      <h3 className="mt-1 font-semibold text-gray-900">
                        <Link to={`/books/${product._id}`}>
                          <span className="absolute inset-0" />
                          {product.title}
                        </Link>
                      </h3>
                      <div className="flex justify-between">
                        <p className="mt-1 text-sm font-medium text-gray-700">{product.author}</p>
                        <p className="mt-1 text-sm font-medium text-gray-700">${product.price}</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="sr-only">Book Genre and Publication date</h4>
                  <div className="flex justify-between">
                    <p className="mt-1 text-center text-sm font-medium text-gray-500">{product.genre}</p>
                    <p className="mt-1 text-center text-sm font-medium text-gray-500">{product.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex px-4 sm:hidden">
          <Link to="/books" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            See all<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

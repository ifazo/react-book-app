// /* This example requires Tailwind CSS v2.0+ */
// const products = [
//     {
//         id: 1,
//         name: 'Leather Long Wallet',
//         color: 'Natural',
//         price: '$75',
//         href: '#',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
//         imageAlt: 'Hand stitched, orange leather long wallet.',
//     },
//     {
//         id: 2,
//         name: 'Leather Long Wallet',
//         color: 'Natural',
//         price: '$75',
//         href: '#',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
//         imageAlt: 'Hand stitched, orange leather long wallet.',
//     },
//     {
//         id: 3,
//         name: 'Leather Long Wallet',
//         color: 'Natural',
//         price: '$75',
//         href: '#',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
//         imageAlt: 'Hand stitched, orange leather long wallet.',
//     },
//     // More products...
// ]

import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../provider/api/apiSlice"
import { IProduct } from "../provider/types/Types"

export default function ProductList() {

    const { data: products } = useGetProductsQuery("")
    console.log(products)

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Book List</h2>
                    <a href="#" className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                        Browse the collection<span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                    {products?.map((product: IProduct) => (
                        <div key={product._id} className="group relative">
                            <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                                <img
                                    src={product.imgUrl}
                                    alt="book cover"
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            <h3 className="mt-4 text-center text-sm font-bold text-gray-900">
                                <Link to={`/books/${product._id}`}>
                                    <span className="absolute inset-0" />
                                    {product.title}
                                </Link>
                            </h3>
                            <div className="flex justify-between">
                                <p className="mt-1 text-sm text-gray-500">{product.author}</p>
                                <p className="mt-1 text-sm text-gray-500">{product.genre}</p>
                            </div>
                            <p className="mt-1 text-center text-sm font-medium text-gray-700">{product.date}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-sm md:hidden">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Shop the collection<span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

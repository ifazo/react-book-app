import { StarIcon } from "@heroicons/react/solid"
import { useGetProductsQuery } from "../provider/api/apiSlice"
import { Link } from 'react-router-dom'

const reviews = [
    {
        rating: 5,
        reviewCount: 38,
    },
    {
        rating: 3,
        reviewCount: 18,
    },
    {
        rating: 5,
        reviewCount: 14,
    },
    {
        rating: 4,
        reviewCount: 21,
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const ProductList = () => {

    const { data: products } = useGetProductsQuery("")

    return (
        <section aria-labelledby="products-heading" className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
            <h2 id="products-heading" className="sr-only">
                Products
            </h2>

            <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                {products?.map((product: IProduct) => (
                    <div key={product._id} className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
                        <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                            <img
                                src={product.imgUrl}
                                alt="product"
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                        <div className="pt-10 pb-4 text-center">
                            <h3 className="text-sm font-medium text-gray-900">
                                <Link to={`/books/${product._id}`}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.title}
                                </Link>
                            </h3>
                            <div className="mt-3 flex flex-col items-center">
                                <p className="sr-only">{reviews.rating} out of 5 stars</p>
                                <div className="flex items-center">
                                    {reviews.map((review) => (
                                        <StarIcon
                                            key={review.rating}
                                            className={classNames(
                                                review.rating > review.rating ? 'text-yellow-400' : 'text-gray-200',
                                                'flex-shrink-0 h-5 w-5'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{product.reviewCount} reviews</p>
                            </div>
                            <p className="mt-4 text-base font-medium text-gray-900">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProductList
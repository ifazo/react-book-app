import { StarIcon } from '@heroicons/react/solid'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../provider/api/apiSlice'
import { useState } from 'react'
import Modal from './Modal'
import { useAppSelector } from '../provider/hook'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const reviews = {
    average: 4,
    totalCount: 1624,
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {

    const { id } = useParams()
    const [ open, setOpen ] = useState(false)

    const { user } = useAppSelector(state => state.user)
    const { data: product } = useGetProductByIdQuery(id as string)
    // const [ postStatus ] = usePostStatusMutation()

    const handleStatus = async () => {
        const status = {
            bookId: product?._id,
            title: product?.title,
            author: product?.author,
            genre: product?.genre,
            email: user.email,
            status: 'wishlist',
        };
        // await postStatus(status)
        try {
            axios.post('http://localhost:5000/api/book/status', status)
                .then(() => {
                    toast.success('Added to wishlist');
                })
                .catch(() => {
                    toast.error('Something went wrong');
                });
        } catch (error) {
            toast.error('Failed to add to wishlist');
        }
    };

    return (
        <div className="bg-white">
            <div className="px-5 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                {/* Product image */}
                <div className="lg:row-end-1 lg:col-span-4">
                    <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                        <img src={product?.imgUrl} alt={"product"} className="object-center object-cover" />
                    </div>
                </div>
                {/* Product details */}
                <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">

                    <div className="flex flex-col">
                        <div className="my-4">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Book Name</h1>
                        </div>

                    </div>
                    <div className="border-t border-gray-200 mt-10 pt-10">
                        <h3 className="text-lg font-medium text-gray-900">Author : {product?.author}</h3>
                        <h3 className="text-lg font-medium text-gray-900">Genre : {product?.genre}</h3>
                        <h3 className="text-lg font-medium text-gray-900">Publication Date : {product?.genre}</h3>
                        <div className="mt-3 flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">Book Reviews :</h3>
                            <div>
                                <div className="flex items-center">
                                    {[ 0, 1, 2, 3, 4 ].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                'flex-shrink-0 h-5 w-5'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                            </div>
                            <p className="ml-2 text-sm font-medium text-gray-900">Based on {reviews.totalCount} reviews</p>
                        </div>

                    </div>
                    <p className="text-gray-500 mt-6">{product?.description}</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        <button
                            type="button"
                            className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Pay ${product?.price}
                        </button>
                        <button
                            onClick={() => handleStatus()}
                            type="button"
                            className="w-full bg-indigo-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Add to WishList
                        </button>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            If you’ve used this product, share your thoughts with other customers
                        </p>
                        <button onClick={() => setOpen(!open)} className="mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full">
                            Write a review
                        </button>
                        <Modal open={open} setOpen={setOpen} product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}

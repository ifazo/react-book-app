import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteProductMutation, useGetProductByIdQuery, usePostStatusMutation } from '../app/api/apiSlice'
import { useState } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'
import { CalendarIcon, PencilAltIcon, TrashIcon, UserIcon } from '@heroicons/react/outline'
import { useAppSelector } from '../app/hook'

// function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(' ')
// }

export default function ProductDetails() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const { id } = useParams();

    const { data: book } = useGetProductByIdQuery(id as string);
    // if (!book) return <div>Loading...</div>
    // const { title, authors, categories, isbn, pageCount, longDescription, thumbnailUrl } = book as IBook
    const { user } = useAppSelector((state) => state.user);
    
    const [postStatus] = usePostStatusMutation()
    const [deleteProduct] = useDeleteProductMutation()

    const handleStatus = () => {
        postStatus({ status: 'wishlist', bookId: book._id, title: book.title, author: book.authors[0], category: book.categories[0] })
            .unwrap()
            .then(() => {
                toast.success('Book added to wishlist')
                navigate(0)
            }).catch(() => {
                toast.error('Failed to add Book')
            })
    }

    const handleDelete = () => {
        deleteProduct(id as string)
            .unwrap()
            .then(() => {
                toast.success('Book deleted successfully')
                navigate(-1)
            }).catch(() => {
                toast.error('Failed to delete Book')
            })
    }

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                {/* Product details */}
                <div className="lg:max-w-lg lg:self-end">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-2">
                            <li>
                                <div className="flex items-center text-sm">
                                    <Link to="/books" className="font-medium text-gray-500 hover:text-gray-900">
                                        Books
                                    </Link>

                                    <svg
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="ml-2 flex-shrink-0 h-5 w-5 text-gray-300"
                                    >
                                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                    </svg>
                                    <Link to="/books" className="font-medium text-gray-500 hover:text-gray-900">
                                        {book?.isbn}
                                    </Link>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="mt-4">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{book?.title}</h1>
                    </div>

                    <section aria-labelledby="information-heading" className="mt-4">
                        <h2 id="information-heading" className="sr-only">
                            Product information
                        </h2>

                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-gray-900 sm:text-xl">Category: {book?.categories[0]}</p>

                            {/* <div className="ml-4 pl-4 border-l border-gray-300">
                                <h2 className="sr-only">Reviews</h2>
                                <div className="flex items-center">
                                    <div>
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    </div>
                                    <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                                </div>
                            </div> */}
                        </div>

                        <div className="flex justify-between">
                            <div className="mt-6 flex items-center">
                                <UserIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
                                <p className="ml-2 font-medium text-base text-gray-700">Author: {book?.authors[0]}</p>
                            </div>
                            <div className="mt-6 flex items-center">
                                <CalendarIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
                                <p className="ml-2 font-medium text-base text-gray-700">Page: {book?.pageCount}</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-500">{book?.longDescription}</p>
                        </div>
                    </section>
                </div>

                {/* Product image */}
                <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
                    <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                        <img src={book?.thumbnailUrl} alt="cover" className="w-full h-full object-center object-cover" />
                    </div>
                </div>

                {/* Product form */}
                <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                    <section aria-labelledby="options-heading">
                        <h2 id="options-heading" className="sr-only">
                            Product options
                        </h2>

                        <form>
                            {user?.email === book?.email ? (
                                <div className="flex justify-between">
                                    <Link
                                        to={`/books/edit/${book?._id}`}
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <PencilAltIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete()}
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        Delete
                                    </button>
                                </div>
                            )
                                : (
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            aria-disabled="true"
                                            className="cursor-not-allowed inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <PencilAltIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="cursor-not-allowed inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            <div className="mt-5">
                                <button
                                    type="button"
                                    onClick={() => handleStatus()}
                                    className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                >
                                    Add to Wishlist
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                                >
                                    Write a review
                                </button>
                            </div>
                        </form>
                    </section>
                    <Modal open={open} setOpen={setOpen} />
                </div>
            </div>
        </div>
    )
}

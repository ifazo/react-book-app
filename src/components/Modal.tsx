/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IReview } from '../types'
import { useAppSelector } from '../app/hook'
import { usePostReviewMutation } from '../app/api/apiSlice'
import toast from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export default function Modal({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const cancelButtonRef = useRef(null)

    const { user } = useAppSelector(state => state.user)
    const [ postReview ] = usePostReviewMutation()

    const { register, handleSubmit, formState: { errors } } = useForm<IReview>()
    const onSubmit: SubmitHandler<IReview> = (data: IReview) => {
        console.log(data)
        data.rating = Number(data.rating)
        if (!user) return toast.error('Please login first')
        postReview({ id, data })
            .then(() => {
                toast.success('Review added successfully')
                navigate(0)
            })
            .catch(err => {
                console.log(err)
                toast.error('Login or Sign up first')
            })
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                Give a Review
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Your new project has been created. Invite your
                                team to collaborate on this project.
                            </p>
                            {errors.rating && <p className="text-red-500 text-xs italic">Rating is required</p>}
                            <label className="block my-3" htmlFor="rating">
                                <span className="sr-only">Rating</span>
                                <select
                                    id="rating"
                                    {...register("rating", { required: true })}
                                    className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5" selected>5</option>
                                </select>
                            </label>
                            {errors.title && <p className="text-red-500 text-xs italic">Title is required</p>}
                            <label>
                                <input
                                    id="title"
                                    type="text"
                                    {...register("title", { required: true })}
                                    placeholder="Give a Title"
                                    className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                            </label>
                            {errors.details && <p className="text-red-500 text-xs italic">Details is required</p>}
                            <label className="block mt-3" htmlFor="details">
                                <textarea
                                    id="details"
                                    {...register("details", { required: true })}
                                    placeholder="Describe more..."
                                    className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                            </label>

                            <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                <button type="button"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                    Submit
                                </button>
                            </div>
                        </div >
                    </div >
                </form>
            </Dialog>
        </Transition.Root>
    )
}

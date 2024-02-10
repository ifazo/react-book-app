import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../app/hook";
import { useDeleteStatusMutation, useGetStatusQuery, useUpdateStatusMutation } from "../app/api/apiSlice";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IStatus } from "../types";

export default function WishlistTable() {
    const navigate = useNavigate();
    const [ open, setOpen ] = useState(false)
    const { user } = useAppSelector((state) => state.user);
    console.log(user)
    const { data } = useGetStatusQuery({ status: 'wishlist', user: user?.email })
    console.log(data)
    const [ updateStatus ] = useUpdateStatusMutation();
    const [ deleteStatus ] = useDeleteStatusMutation();

    const handleAddToReading = (id: string) => {
        const data = { status: 'reading' }
        updateStatus({ id, data })
            .then((res) => {
                console.log(res)
                toast.success('Added to reading list');
                navigate(0)
            })
            .catch((err) => {
                console.log(err)
                toast.error('Something went wrong');
            });
    };

    const handleDeleteStatus = (id: string) => {
        deleteStatus(id as string)
            .then((res) => {
                console.log(res)
                toast.success('Deleted from wishlist');
                navigate(0)
            })
            .catch(() => {
                toast.error('Something went wrong');
            });
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Wishlist Books</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the books added by {user?.name}
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                        >
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Author
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Categories
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Change Status
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Delete Status
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {Array.isArray(data) && data?.map((status: IStatus) => (
                                        <tr key={status?._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                {status?.title}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{status?.author}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{status?.category}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center sm:pr-6 lg:pr-8">
                                                <button
                                                    type="button"
                                                    onClick={() => { setOpen(!open), handleAddToReading(status._id) }}
                                                    className="text-indigo-600 hover:text-indigo-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                    <span className="sr-only">Edit</span>
                                                </button>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center sm:pr-6 lg:pr-8">
                                                <button
                                                    type="button"
                                                    onClick={() => { setOpen(!open), handleDeleteStatus(status._id) }}
                                                    className="text-red-600 hover:text-red-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                    <span className="sr-only">Delete</span>
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

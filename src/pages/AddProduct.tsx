import { useForm, SubmitHandler } from "react-hook-form"
import { IProduct } from "../provider/types/Types"
import axios from "axios";
import { useAppSelector } from '../provider/hook';
import { toast } from "react-hot-toast";

const imgToken = import.meta.env.VITE_IMGBB_TOKEN

export default function AddProduct() {

    const { user } = useAppSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IProduct>()

    const imgHostUrl = `https://api.imgbb.com/1/upload?key=${imgToken}`

    const onSubmit: SubmitHandler<IProduct> = (data) => {

        const formData = new FormData()
        formData.append('image', data.image[ 0 ])
        fetch(imgHostUrl, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                if (res.data) {
                    const imgUrl = res.data?.display_url;
                    const { username, email, title, author, date, description, genre } = data;
                    const newData = { username, email, title, author, date, description, genre, imgUrl }
                    toast.loading("Uploading Book...")
                    try {
                        axios.post('http://localhost:5000/api/books', newData)
                            .then(() => {
                                toast.success("Book uploaded successfully")
                                window.location.href = "/"
                            })
                            .catch(() => {
                                toast.error("Failed to upload Book")
                                window.location.href = "/"
                            })
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
            .catch(err => console.log('Error during ImgBB API request:', err))

    }

    return (
        <form className="p-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <h2 className="text-center font-bold text-gray-900">Add Book Info</h2>

                <div className="border-y border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="username"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={user.name}
                                    readOnly
                                    {...register("username", { required: true })}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    defaultValue={user.email}
                                    readOnly
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("email", { required: true })}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Book title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    type="text"
                                    autoComplete="title"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("title", { required: true })}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                                Author name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="author"
                                    type="text"
                                    autoComplete="author"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("author", { required: true })}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                Publication Date
                            </label>
                            <div className="mt-2">
                                <input
                                    id="date"
                                    type="text"
                                    autoComplete="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("date", { required: true })}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    placeholder="Write a few sentences about the product."
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("description", { required: true })}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                Photo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <div className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>

                                    </div>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="image"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a image</span>
                                            <input id="image" type="file" className="sr-only" {...register("image")} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="genre" className="block text-sm font-medium leading-6 text-gray-900">
                                Genre
                            </label>
                            <div className="mt-2">
                                <select
                                    id="genre"
                                    autoComplete="genre"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    {...register("genre", { required: true })}
                                >
                                    <option>Science Fiction</option>
                                    <option>Horror</option>
                                    <option>Romantic</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <input
                    type="submit"
                    value="Add"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                />
            </div>
        </form>
    )
}

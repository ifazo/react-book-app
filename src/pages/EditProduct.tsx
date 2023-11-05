import { toast } from "react-hot-toast";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../provider/api/apiSlice";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../provider/hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProduct } from "../types";


export default function EditProduct() {

    const { id } = useParams() as { id: string };
    const { user } = useAppSelector((state) => state.user)
    console.log(user)
    const { data: product } = useGetProductByIdQuery(id as string)
    const [ updateProduct ] = useUpdateProductMutation()

    const { register, handleSubmit } = useForm<IProduct>()

    const onSubmit: SubmitHandler<IProduct> = (data: IProduct) => {
        const imgToken = import.meta.env.VITE_IMGBB_TOKEN
        const formData = new FormData();
        formData.append('image', data.image[ 0 ]);
        fetch(`https://api.imgbb.com/1/upload?key=${imgToken}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                const imgUrl = res.data?.display_url;
                data.image = imgUrl
                updateProduct({ id: id, data: data })
                    .then(() => toast.success('Product edited successfully'))
                    .catch(() => toast.error('Unauthorize user request'))
            })
    }

    const handleCancel = () => {
        window.location.href = "/dashboard"
    }

    return (
        <form className="p-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <h2 className="text-2xl text-center font-bold text-gray-900">Edit Book Info</h2>
                <div className="border-y border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Book title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    defaultValue={product?.title}
                                    {...register("title")}
                                    type="text"
                                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <input
                                    id="price"
                                    defaultValue={product?.price}
                                    {...register("price", { required: true })}
                                    type="text"
                                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="genre" className="block text-sm font-medium leading-6 text-gray-900">
                                Genre
                            </label>
                            <div className="mt-2">
                                <select
                                    id="genre"
                                    defaultValue={product?.genre}
                                    {...register("genre", { required: true })}
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                                >
                                    <option>Science</option>
                                    <option>Commerce</option>
                                    <option>Arts</option>
                                    <option>Others</option>
                                </select>
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
                                    defaultValue={product?.author}
                                    {...register("author", { required: true })}
                                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                                    type="date"
                                    defaultValue={product?.date}
                                    {...register("date", { required: true })}
                                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                                    rows={3}
                                    defaultValue={product?.description}
                                    {...register("description", { required: true })}
                                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                                            <input
                                                id="image"
                                                type="file"
                                                {...register("image")}
                                                className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">One image up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={() => handleCancel()} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <input
                    type="submit"
                    value="Edit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                />
            </div>
        </form>
    )
}
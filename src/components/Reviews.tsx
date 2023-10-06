/* This example requires Tailwind CSS v2.0+ */
import { StarIcon } from '@heroicons/react/solid'
import { useGetReviewsQuery } from '../provider/api/apiSlice';
import { useParams } from 'react-router-dom';
import { IReview } from '../types';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Reviews() {
    const {id } = useParams()
    const { data } = useGetReviewsQuery(id as string);
    console.log(data)
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:py-8 lg:px-8">
                <div className="mt-4 lg:mt-2">
                    <h2 className="my-4 text-2xl font-extrabold tracking-tight text-gray-900">Customer Reviews</h2>
                    <div className="flow-root">
                        <div className="-my-12 divide-y divide-gray-200">
                            {Array.isArray(data) && data?.map((review: IReview) => (
                                <div key={review._id} className="py-12">
                                    <div className="flex items-center">
                                        {/* <img src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full" /> */}
                                        <div className="ml-4">
                                            <h4 className="text-sm font-bold text-gray-900">{review.name}</h4>
                                            <div className="mt-1 flex items-center">
                                                {[ 0, 1, 2, 3, 4 ].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                            'h-5 w-5 flex-shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <p className="sr-only">{review.rating} out of 5 stars</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-6 text-base italic text-gray-600">
                                        <p>{review.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

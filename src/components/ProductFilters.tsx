import { Fragment, useRef, useState } from 'react'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { useGetProductsQuery } from '../provider/api/apiSlice'
import { IProduct } from '../types'

const sortOptions = [
    { name: 'Most Popular', href: '#' },
    { name: 'Best Rating', href: '#' },
    { name: 'Newest', href: '#' },
]
const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'tees', label: 'Tees' },
            { value: 'crewnecks', label: 'Crewnecks' },
            { value: 'hats', label: 'Hats' },
        ],
    },
    {
        id: 'brand',
        name: 'Brand',
        options: [
            { value: 'clothing-company', label: 'Clothing Company' },
            { value: 'fashion-inc', label: 'Fashion Inc.' },
            { value: 'shoes-n-more', label: "Shoes 'n More" },
        ],
    },
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White' },
            { value: 'black', label: 'Black' },
            { value: 'grey', label: 'Grey' },
        ],
    },
    {
        id: 'sizes',
        name: 'Sizes',
        options: [
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
        ],
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductFilters() {
    const [ open, setOpen ] = useState(false)
    const [ search, setSearch ] = useState('')
    const searchRef = useRef<HTMLInputElement>(null);

    const { data } = useGetProductsQuery(search)
    console.log(data)

    const handleSearch = () => {
        console.log(searchRef.current?.value)
        setSearch(searchRef.current?.value || '')
    }

    return (
        <>
            <div className="bg-gray-50">
                {/* Mobile filter dialog */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 sm:hidden" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                                <div className="px-4 flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4">
                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                <ChevronDownIcon
                                                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                <div className="max-w-3xl mx-auto px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="py-24">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500">
                            Thoughtfully designed objects for the workspace, home, and travel.
                        </p>
                    </div>

                    <section aria-labelledby="filter-heading" className="border-t border-gray-200 py-6">
                        <h2 id="filter-heading" className="sr-only">
                            Product filters
                        </h2>

                        <div className="flex items-center justify-between">
                            <Menu as="div" className="relative z-10 inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option, index) => (
                                                <Menu.Item key={index}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm font-medium text-gray-900'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>



                            <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                                <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 mx-3 my-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <Link to="/add">Add</Link>
                                    </button>
                                    <div className="w-full">
                                        <label htmlFor="search" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="search"
                                                name="search"
                                                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="Search"
                                                type="search"
                                                ref={searchRef}
                                                onChange={() => handleSearch()}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSearch()}
                                        className="inline-flex items-center px-3 py-2 mx-3 my-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                                onClick={() => setOpen(true)}
                            >
                                Filters
                            </button>

                            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                                {filters.map((section, sectionIdx) => (
                                    <Popover as="div" key={section.name} id="desktop-menu" className="relative z-10 inline-block text-left">
                                        <div>
                                            <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                <span>{section.name}</span>
                                                {sectionIdx === 0 ? (
                                                    <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                                                        1
                                                    </span>
                                                ) : null}
                                                <ChevronDownIcon
                                                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <form className="space-y-4">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                type="checkbox"
                                                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </form>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                ))}
                            </Popover.Group>
                        </div>
                    </section>
                </div>
            </div>

            {/* Product grid */}
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Book List</h2>
                        <a href="#" className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                            Browse the collection<span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                        {data?.map((product: IProduct) => (
                            <div key={product._id} className="group relative">
                                <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                                    <img
                                        src={product.image}
                                        alt="book cover"
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <h3 className="mt-2 text-center text-sm font-bold text-gray-900">
                                    <Link to={`/books/${product._id}`}>
                                        <span className="absolute inset-0" />
                                        {product.title}
                                    </Link>
                                </h3>
                                <div className="flex justify-between">
                                    <p className="mt-1 text-sm font-medium text-gray-700">{product.author}</p>
                                    <p className="mt-1 text-sm font-medium text-gray-700">${product.price}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="mt-1 text-center text-sm font-medium text-gray-700">{product.genre}</p>
                                    <p className="mt-1 text-center text-sm font-medium text-gray-700">{product.date}</p>
                                </div>
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
        </>
    )
}

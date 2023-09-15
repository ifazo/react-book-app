import Reviews from "../components/Reviews"
import ProductDetails from '../components/ProductDetails'

export default function ProductDetailsPage() {

    return (
        <div className="bg-white">
            <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <ProductDetails />
                <Reviews />
            </div>
        </div>
    )
}

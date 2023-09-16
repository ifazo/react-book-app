import Reviews from "../components/Reviews"
import ProductDetails from '../components/ProductDetails'

export default function ProductDetailsPage() {

    return (
        <div className="bg-white">
            <ProductDetails />
            <Reviews />
        </div>
    )
}

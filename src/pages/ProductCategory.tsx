import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import { useGetProductsQuery } from "../provider/api/apiSlice";
import { useAppSelector } from "../provider/hook";

export default function ProductCategory() {

    const { user } = useAppSelector((state) => state.user);
    console.log(user)
    const { data: products } = useGetProductsQuery("")
    console.log(products)
    return (
        <div>
            <ProductFilters />
            <ProductList />
        </div>
    )
}

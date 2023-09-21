import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import { useAppSelector } from "../provider/hook";

export default function ProductCategory() {

    const { user } = useAppSelector((state) => state.user);
    console.log(user)
    // const { data: products, isLoading } = useGetProductsQuery(user?.id);

    return (
        <div>
            <ProductFilters />
            <ProductList />
        </div>
    )
}

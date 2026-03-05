import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`http://localhost:3000/products?subSlug=${slug}`);
            const data = await res.json();
            setProducts(data);
        }
        fetchProducts();
    }, [])

    return (
        <div className="container mx-auto px-6 lg:px-12">
            <hr className="text-[#ccc]" />
            <div className="my-3 md:my-4">
                <h2 className="text-lg md:text-2xl text-black font-bold mb-3 md:mb-6">Suggested For You</h2>
                <div className="grid grid-cols-12">
                    {
                        products.map((product) => {
                            return (
                                <Link to={`/${product.subSlug}/${product.slug}`} key={product.id} className="col-span-6 md:col-span-3 lg:col-span-2 pb-2 pr-2">
                                    <ProductCard product={product} />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default ProductPage
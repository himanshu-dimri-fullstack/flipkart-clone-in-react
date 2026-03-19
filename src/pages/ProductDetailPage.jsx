import { Star } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import { ArrowRight } from "lucide-react"
import { CartContext } from "../context/CartContext";

const ProductDetailPage = () => {

    const { slug } = useParams();
    const navigate = useNavigate();

    const { cart, addToCart } = useContext(CartContext);

    const [loading, setLoading] = useState(true);
    const [subCat, setSubCat] = useState(null);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://flipkart-server-09gl.onrender.com/products?slug=${slug}`);
                const data = await res.json();
                const subCategoryId = data[0].subcategoryId;
                const subCat = await fetch(`https://flipkart-server-09gl.onrender.com/subcategories/${subCategoryId}`);
                const subCatData = await subCat.json();
                setSubCat(subCatData);

                setProduct(data[0]);
                const productsRes = await fetch(`https://flipkart-server-09gl.onrender.com/products?subcategoryId=${subCatData.id}`);
                const productsData = await productsRes.json();
                setProducts(productsData);
            }
            catch (err) {
                console.log(err.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    // console.log(subCat);

    const finalPrice = product?.discount ? product?.price - product?.price * (product?.discount / 100) : product?.price;

    const isInCart = cart.some((item) => item.product.id === product?.id);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-[#ffe51f] rounded-full animate-spin"></div>
            </div>
        )
    }
    return (
        <div className="bg-[#f1f3f6]  border-t border-solid border-[#ccc]">
            <div className="container mx-auto px-6 lg:px-12 bg-white">
                <div className="px-1">
                    <div className="py-2">
                        <span className="text-sm text-[#707070ff] font-semibold pr-1"><Link>Home</Link></span>
                        <span className="text-sm text-[#707070ff] font-semibold pr-1">/</span>
                        <span className="text-sm text-[#707070ff] font-semibold pr-1"><Link>{subCat.name}</Link></span>
                        <span className="text-sm text-[#707070ff] font-semibold pr-1">/</span>
                        <span className="text-sm text-[#707070ff] font-semibold pr-1"><Link>{product.title}</Link></span>
                    </div>
                    <div className="grid grid-cols-12 my-2">
                        <div className="col-span-12 md:col-span-7">
                            <div className="grid grid-cols-12">
                                <div className="col-span-6 pr-2">
                                    <div className="bg-[#f1f3f6] border border-[#eee] rounded-2xl">
                                        <img src={product.image} className="w-full h-50 md:h-100 p-1 object-contain" />
                                    </div>
                                </div>
                                <div className="col-span-6 pr-2">
                                    <div className="bg-[#f1f3f6] border border-[#eee] rounded-2xl">
                                        <img src={product?.videoThumbnail} className="w-full h-50 md:h-100 p-1 object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-5 pt-2 md:pt-0 md:pl-10">
                            <div className="flex gap-2">
                                {
                                    product.thumbnails.map((item, index) => {
                                        return (
                                            <div key={index} className="border-2 border-[#eee] rounded-2xl">
                                                <img src={item} className="w-20 h-20 object-contain rounded-2xl" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="my-3">
                                <div className="text-lg text-black">
                                    <span>{product.title}</span>
                                </div>
                                <div className="flex justify-center items-center gap-1 w-30 h-10 border border-[#eee] bg-[#eee] rounded-xl mt-2">
                                    <span className="text-sm text-black font-semibold ">{product.rating}</span>
                                    <span><Star size={14} className="text-green-600" /></span>
                                    <span className="text-sm text-black font-semibold ">|</span>
                                    <span className="text-sm text-black">{product.reviews}</span>
                                </div>
                                <div className="mt-2">
                                    {
                                        (product?.discount) ?
                                            <>
                                                <span className="text-2xl line-through text-[#707070] pr-4">{product.price}</span>
                                                <span className="text-2xl text-black font-bold">₹{parseInt(finalPrice)}</span>
                                            </>
                                            : <span className="text-2xl text-black font-bold">₹{parseInt(finalPrice)}</span>
                                    }
                                </div>
                            </div>
                            <div>
                                {
                                    product?.brand &&
                                    <div>
                                        <span className="text-lg text-black font-semibold mr-2">Brand :</span>
                                        <span className="text-lg text-[#707070]">{product?.brand}</span>
                                    </div>
                                }

                                {
                                    product?.ram &&
                                    <div>
                                        <span className="text-lg text-black font-semibold mr-2">Ram :</span>
                                        <span className="text-lg text-[#707070]">{product?.ram}</span>
                                    </div>
                                }

                                {
                                    product?.storage &&
                                    <div>
                                        <span className="text-lg text-black font-semibold mr-2">Storage :</span>
                                        <span className="text-lg text-[#707070]">{product?.storage}</span>
                                    </div>
                                }

                                {
                                    product?.os &&
                                    <div>
                                        <span className="text-lg text-black font-semibold mr-2">OS :</span>
                                        <span className="text-lg text-[#707070]">{product?.os}</span>
                                    </div>
                                }



                            </div>
                            <div className="flex gap-4 my-3">
                                {
                                    isInCart ?
                                        <Button onClick={() => navigate("/cart")} className="text-md text-black  font-semibold px-4 lg:px-8 py-3 border border-[#707070] rounded-xl bg-white">View Cart</Button>
                                        :
                                        <Button onClick={() => { addToCart(product) }} className="text-md text-black  font-semibold px-4 lg:px-8 py-3 border border-[#ffe51fff] rounded-xl bg-[#ffe51fff]">Add to Cart</Button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between my-2 md:my-5">
                        <h3 className="text-lg md:text-2xl text-black font-bold">Suggested for you</h3>
                        <Link to={`/product/${subCat.slug}`} className="py-1 px-3 md:py-2 md:px-6 bg-[#2a55e5] border border-[#eee] rounded-2xl">
                            <ArrowRight size={18} className="text-white" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-12 pb-3">
                        {
                            products.slice(0, 6).map((product, index) => {
                                return (
                                    <Link to={`/category/${product.subSlug}/${product.slug}`} className="col-span-6 md:col-span-4 lg:col-span-2 pr-2" key={index}>
                                        <ProductCard product={product} />
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductDetailPage
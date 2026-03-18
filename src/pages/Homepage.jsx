import { useEffect, useState } from "react"
import CategoryCard from "../components/CategoryCard"
import HomeSlider from "../components/home/HomeSlider"
import data from "../data/categoryData"
import ProductCard from "../components/ProductCard"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const Homepage = () => {

    const [mobiles, setMobiles] = useState([]);
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [mobilesRes, watchesRes] = await Promise.all([
                    fetch("https://flipkart-server-09gl.onrender.com/products?subcategoryId=1"),
                    fetch("https://flipkart-server-09gl.onrender.com/products?subcategoryId=2")
                ]);

                const [mobilesData, watchesData] = await Promise.all([
                    mobilesRes.json(),
                    watchesRes.json()
                ]);
                setMobiles(mobilesData);
                setWatches(watchesData);
                setLoading(false);

            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className='container px-6 lg:px-12 mx-auto'>
            <hr className="text-[#ccc]" />
            <div className="my-4">

                <HomeSlider />

                <div className="grid grid-cols-12 py-2">
                    <div className="col-span-12 lg:col-span-9 overflow-x-auto scroll-smooth hide-scrollbar">
                        <div className="w-full flex gap-4">
                            {
                                data.map((d, i) => {
                                    return (
                                        <div key={i} className="w-full">
                                            <CategoryCard name={d.name} src={d.img} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                {
                    loading ?
                        <div className="flex justify-center items-center h-screen ">
                            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#ffe51f] rounded-full animate-spin"></div>
                        </div>
                        :
                        mobiles.length > 0 &&
                        <div className="">
                            <div className="flex justify-between py-2 md:py-5">
                                <h3 className="text-lg md:text-2xl text-black font-bold">Suggested for you</h3>
                                <Link to={"/product/mobiles"} className="py-1 px-3 md:py-2 md:px-6 bg-[#2a55e5] border border-[#eee] rounded-2xl">
                                    <ArrowRight size={18} className="text-white" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-12 py-2">
                                {
                                    mobiles.slice(0, 6).map((product) => {
                                        return (
                                            <Link to={`/category/${product.subSlug}/${product.slug}`} key={product.id} className="col-span-6 md:col-span-4 lg:col-span-2 pr-2">
                                                <ProductCard product={product} />
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                }

                {
                    loading ?
                        <div className="flex justify-center items-center h-screen ">
                            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#ffe51f] rounded-full animate-spin"></div>
                        </div>
                        :
                        watches.length > 0 &&
                        <div className="">
                            <div className="flex justify-between py-2 md:py-5">
                                <h3 className="text-lg md:text-2xl text-black font-bold">Suggested for you</h3>
                                <Link to={"/product/wrist-watches"} className="py-1 px-3 md:py-2 md:px-6 bg-[#2a55e5] border border-[#eee] rounded-2xl">
                                    <ArrowRight size={18} className="text-white" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-12 py-2">
                                {
                                    watches.slice(0, 6).map((product) => {
                                        return (
                                            <Link to={`/category/${product.subSlug}/${product.slug}`} key={product.id} className="col-span-6 md:col-span-4 lg:col-span-2 pr-2">
                                                <ProductCard product={product} />
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}

export default Homepage
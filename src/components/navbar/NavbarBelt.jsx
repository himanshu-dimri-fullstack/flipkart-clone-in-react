import { ArrowBigDownDash, ArrowDown, ChevronDown, ShoppingCart, User } from "lucide-react"

const NavbarBelt = () => {
    return (
        <div className="grid grid-cols-12 gap-3 pt-1 pb-3 md:py-3">
            <div className="col-span-12 md:col-span-7 xl:col-span-9">
                <input className="w-full h-10 px-2 text-black text-lg border border-[#2a55e5] rounded-lg" placeholder="Search for Products" />
            </div>
            <div className="hidden md:block md:col-span-5 xl:col-span-3 pl-10">
                <div className="flex justify-between items-center h-10">
                    <div className="flex gap-2">
                        <User size={18} />
                        <span className="text-black text-sm">Login</span>
                        <ChevronDown size={18} />
                    </div>
                    <div className="flex gap-2">
                        <span className="text-black text-sm">More</span>
                        <ChevronDown size={18} />
                    </div>
                    <div className="flex gap-2">
                        <ShoppingCart size={18} />
                        <span className="text-black text-sm">Cart</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarBelt
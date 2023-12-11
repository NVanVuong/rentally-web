import { Background1 } from "@/assets/images"
import { motion } from "framer-motion"

const HeroSlide = () => {
    return (
        <div className="relative mb-4 bg-black/40 bg-opacity-30">
            <img
                className="aspect-[5/2] w-full object-cover after:absolute after:bottom-0 after:left-0 after:h-[100px] after:w-full after:bg-gradient-to-t after:from-red-300 after:to-transparent after:content-['']"
                src={Background1}
                alt="Background-1"
            />
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 text-center text-white"
            >
                <div>
                    {" "}
                    <h2 className="drop-shawdown-[#e28743] select-none text-6xl font-bold tracking-wide drop-shadow-xl">
                        Welcome to Rentally!
                    </h2>
                    <h3 className="drop-shawdow-[#000] mb-8 select-none text-2xl font-medium drop-shadow-2xl">
                        Your Gateway to Unique and Comfortable Rentals. Find Your Ideal Stay Today.
                    </h3>
                </div>
            </motion.div>
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-white to-transparent" />
        </div>
    )
}

export default HeroSlide

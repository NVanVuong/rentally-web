import { BsStarFill } from "react-icons/bs"
import HeartButton from "../Button/HeartButton"
import { Swiper, SwiperSlide } from "swiper/react"

interface ListingCardProps {}

const ListingCard: React.FC<ListingCardProps> = () => {
    return (
        <div className="group col-span-1 cursor-pointer">
            <div className="flex w-full flex-col gap-2">
                <div className=" relative aspect-square w-full overflow-hidden rounded-xl">
                    <img
                        className="h-full w-full object-cover transition group-hover:scale-110 "
                        src={
                            "https://4.bp.blogspot.com/-kA-ZpYCOQ0s/ULZ_5YHbH1I/AAAAAAAAAHQ/cSa2KCI0MJc/s1600/hotel+paramount+2.jpg"
                        }
                        alt="Listing"
                    />
                    <div className="absolute right-3 top-3">
                        <HeartButton />
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-4">
                    {" "}
                    <p className="text-lg font-semibold">123 Nguyen Van Linh, Hai Chau</p>
                    <div className="flex flex-1 flex-row items-center font-normal ">
                        <BsStarFill />
                        <span>4.91</span>
                    </div>
                </div>
                <p className="font-bold text-[#128E07]">
                    Vancant<span className="font-light text-neutral-500"> at Oct23 - 28</span>
                </p>
                <div className="flex flex-row items-center gap-1">
                    <p className="font-semibold">2M3/month</p>
                </div>
            </div>
        </div>
    )
}

export default ListingCard

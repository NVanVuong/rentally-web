import { BsStarFill } from "react-icons/bs"
import HeartButton from "../Button/HeartButton"
import Carousel from "antd/es/carousel"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import "./index.css"
import { useState } from "react"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"
interface ListingCardProps {
    dataRoom: IRoomFinding
}

const settings = {
    nextArrow: <GrFormNext />,
    prevArrow: <GrFormPrevious />
}

const ListingCard: React.FC<ListingCardProps> = ({ dataRoom }) => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const { images, address, district, price, avgRate, utilities } = dataRoom

    return (
        <div className="group col-span-1 cursor-pointer">
            <div className="flex w-full flex-col ">
                <div className=" relative aspect-square w-full overflow-hidden rounded-xl">
                    <Carousel
                        dotPosition={"bottom"}
                        effect="scrollx"
                        arrows={true}
                        {...settings}
                        style={{ height: "100%" }}
                        beforeChange={(_, to) => setCurrentSlide(to)}
                    >
                        {images?.map((image, index) => (
                            <img
                                key={index}
                                className={`h-full object-cover transition ${
                                    currentSlide == index ? "group-hover:scale-110" : ""
                                } `}
                                src={image}
                                alt="Listing"
                            />
                        ))}
                    </Carousel>

                    <div className="absolute right-3 top-3">
                        <HeartButton />
                    </div>
                </div>
                <div className="mt-2 flex flex-row justify-between">
                    {" "}
                    <h4 className="text-[16px] font-semibold">
                        {address}, {district}
                    </h4>
                    <div className="flex flex-1 flex-row items-center justify-end gap-[2px] text-[14px] font-normal">
                        <BsStarFill size={12} />
                        <span>{avgRate}</span>
                    </div>
                </div>
                <div>
                    {utilities.map((utility)=> <img key={utility.id} alt={utility.note} className="h-7 p-1 rounded-xl bg-slate-300" src={utility.icon}/>)}
                </div>
                <h4 className="text-[14px] font-bold text-[#128E07]">
                    Vacant<span className="font-light text-neutral-500"> at Oct23 - 28</span>
                </h4>
                <div className="mt-2 flex flex-row items-center gap-1 text-[14px]">
                    <h4 className="font-semibold">{price}/month</h4>
                </div>
            </div>
        </div>
    )
}

export default ListingCard

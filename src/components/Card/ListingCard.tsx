import { BsStarFill } from "react-icons/bs"
import HeartButton from "../Button/HeartButton"
import Carousel from "antd/es/carousel"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import "./index.css"
import { useState } from "react"
interface ListingCardProps {}

const settings = {
    nextArrow: <GrFormNext />,
    prevArrow: <GrFormPrevious />
}

const ListingCard: React.FC<ListingCardProps> = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

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
                        <img
                            className={`h-full object-cover transition ${
                                currentSlide == 0 ? "group-hover:scale-110" : ""
                            } `}
                            src={
                                "https://media.vov.vn/sites/default/files/styles/large/public/2021-02/7_ansesourcedargent_ladigue_seychelles_shutterstock_303523277.jpg"
                            }
                            alt="Listing"
                        />
                        <img
                            className={`h-full object-cover transition ${
                                currentSlide == 1 ? "group-hover:scale-110" : ""
                            } `}
                            src={
                                "https://chupanhkhachsan.com/wp-content/uploads/2013/12/chup-anh-khach-san_home-26.jpg"
                            }
                            alt="Listing"
                        />
                        <img
                            className={`h-full object-cover transition ${
                                currentSlide == 2 ? "group-hover:scale-110" : ""
                            } `}
                            src={
                                "https://4.bp.blogspot.com/-kA-ZpYCOQ0s/ULZ_5YHbH1I/AAAAAAAAAHQ/cSa2KCI0MJc/s1600/hotel+paramount+2.jpg"
                            }
                            alt="Listing"
                        />
                        <img
                            className={`h-full object-cover transition ${
                                currentSlide == 3 ? "group-hover:scale-110" : ""
                            } `}
                            src={
                                "https://a0.muscache.com/im/pictures/miso/Hosting-788066030410832017/original/3ebdd732-2966-4ddf-8a6d-3294d3035d6a.jpeg?im_w=720"
                            }
                            alt="Listing"
                        />
                    </Carousel>

                    <div className="absolute right-3 top-3">
                        <HeartButton />
                    </div>
                </div>
                <div className="mt-2 flex flex-row justify-between">
                    {" "}
                    <h4 className="text-[16px] font-semibold">123 Nguyen Van Linh, Hai Chau</h4>
                    <div className="flex flex-1 flex-row items-center justify-end gap-[2px] text-[14px] font-normal">
                        <BsStarFill size={12} />
                        <span>4.91</span>
                    </div>
                </div>
                <h4 className="text-[14px] font-bold text-[#128E07]">
                    Vacant<span className="font-light text-neutral-500"> at Oct23 - 28</span>
                </h4>
                <div className="mt-2 flex flex-row items-center gap-1 text-[14px]">
                    <h4 className="font-semibold">2M3/month</h4>
                </div>
            </div>
        </div>
    )
}

export default ListingCard

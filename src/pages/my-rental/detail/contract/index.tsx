import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { formatNumberWithCommas } from "@/utils/helpers"
import Button from "@/pages/room-detail/components/Button"
import { AverageRating } from "@/pages/room-detail/rating"
import { IHostInfo, IRoomInfo } from "@/interfaces/rentals.interface"
import { Skeleton } from "antd"

interface IContractProps {
    hostInfo?: IHostInfo
    roomInfo?: IRoomInfo
}

const Contract = (props: IContractProps) => {
    const { price, images = [], utilities = [] } = props?.roomInfo || {}

    const landlord = props?.hostInfo

    const handleCallHost = () => {
        window.location.href = `tel:${landlord?.phone}`
    }

    const isLoading = !props?.hostInfo || !props?.roomInfo

    return (
        <div className="h-fit w-[25rem] rounded-lg border border-gray-200 px-6 py-4 shadow-lg">
            {!isLoading ? (
                <>
                    <div className="flex justify-between">
                        <span className="text-xs">
                            <b className="text-base font-bold">{formatNumberWithCommas(price)}</b> VND/month
                        </span>
                        <AverageRating size="small" />
                    </div>
                    <div className="mt-4 flex h-32 items-center gap-4">
                        <img src={images[0]} className="h-full w-40 rounded-xl object-cover" alt="Room image" />

                        <div className="flex flex-col items-start">
                            <span className="mb-1 text-xs font-bold">Utilities</span>
                            <div className="flex items-center gap-2">
                                {utilities.map((utility) => (
                                    <img key={utility.id} className="h-4 w-4" src={utility.icon} />
                                ))}
                            </div>

                            <span className="mb-1 mt-1 text-xs font-bold">Host Information</span>
                            <div className="flex items-center gap-4">
                                <img src={landlord?.photo} className="h-10 w-10 rounded-full" />

                                <div className="flex flex-col text-xs">
                                    <span className="font-medium">{landlord?.firstName}</span>
                                    <span className="text-gray-500">{landlord?.phone}</span>
                                    <a
                                        className="flex items-center gap-1 text-gray-500 transition duration-150 hover:text-primary hover:underline"
                                        href={`mailto:${landlord?.email}`}
                                    >
                                        Mail <AiOutlineMail />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={handleCallHost}
                        className="ml-auto mt-4 w-fit rounded-lg bg-primary px-4 py-1 text-sm text-white"
                    >
                        Contact host <AiOutlinePhone />
                    </Button>
                </>
            ) : (
                <>
                    <br />
                    <Skeleton active paragraph={{ rows: 0 }} />
                    <div className="flex gap-4">
                        <Skeleton.Image style={{ width: "8rem", height: "6rem" }} active />
                        <div className="flex items-center gap-4">
                            <Skeleton.Avatar active />
                            <Skeleton className="w-60" active paragraph={{ rows: 1 }} />
                        </div>
                    </div>
                    <br />
                    <Skeleton active paragraph={{ rows: 0 }} />
                </>
            )}
        </div>
    )
}

export default Contract
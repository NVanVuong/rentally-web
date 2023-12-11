import { IRating } from "@/interfaces/room-detail.interface"
import { Rate } from "antd"

interface IReviews {
    reviews: IRating[]
}

const Reviews = (props: IReviews) => {
    const { reviews } = props

    return (
        <div className="mt-6 pl-2">
            <h1 className="text-lg font-bold">Reviews</h1>
            <div className="grid grid-cols-2 gap-x-40 gap-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="col-span-1 mt-4 flex flex-col items-start gap-2">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12 rounded-full" src={review.renterPhoto} alt={review.renterPhoto} />
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-sm font-bold">{review.renterName}</span>
                                <div>
                                    <Rate
                                        style={{ fontSize: "12px" }}
                                        disabled
                                        allowHalf
                                        defaultValue={Number(review.avgRate)}
                                    />
                                    <span className="ml-2 text-sm font-light">{review.createdAt.split("T")[0]}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews

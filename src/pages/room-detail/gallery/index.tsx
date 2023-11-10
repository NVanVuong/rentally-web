import { useState } from "react"
import { BsFillGrid3X3GapFill } from "react-icons/bs"
import Button from "../components/Button"
import { Image } from "antd"

interface IGallery {
    images: string[]
}

const Gallery = ({ images }: IGallery) => {
    const [showPreview, setShowPreview] = useState(false)

    const firstImage = images[0]
    const otherImages = images.slice(1)

    const gridLayout = [
        "col-span-2 row-span-2",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1",
        "col-span-1 row-span-1"
    ]

    return (
        <div className="relative my-2 grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-lg">
            <Image.PreviewGroup preview={{ visible: showPreview }}>
                {gridLayout.map((layout, index) => (
                    <div key={index} className={layout}>
                        <Image
                            src={index === 0 ? firstImage : otherImages[index - 1]}
                            alt={`Gallery-Image-${index}`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </Image.PreviewGroup>

            <Button
                onClick={() => setShowPreview(true)}
                className="absolute bottom-4 right-4 rounded-md border border-black/80 bg-white px-3 py-1 text-sm shadow-2xl shadow-gray-600"
            >
                <BsFillGrid3X3GapFill /> Show all
            </Button>
        </div>
    )
}

export default Gallery

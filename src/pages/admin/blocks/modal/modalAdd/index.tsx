import Map from "@/components/Map"
import { useState, useEffect } from "react"
import { Button, Form, Input, Spin } from "antd"
import "../style.css"
import { useCreateRoomBlockMutation } from "@/redux/services/block/block.service"
import useServerMessage from "@/hooks/useServerMessage"
import { IRoomBlockRequest } from "@/interfaces/block.interface"

declare global {
    interface Window {
        placeSearch: any
    }
}

export const formRoomBlockRules = {
    description: [{ required: true, message: "Please input description!" }],
    address: [{ required: true, message: "Please input address!" }]
}

const ModalAdd = () => {
    const [mapCenter, setMapCenter] = useState<[number, number]>([16.07408355193989, 108.14989962882427])
    const [address, setAddress] = useState("")
    const [searchResult, setSearchResult] = useState<any>(null)

    const [createRoomBlock, { data, error, isLoading }] = useCreateRoomBlockMutation()

    const onFinish = async (values: any) => {
        const roomBlockRequest: IRoomBlockRequest = {
            address: searchResult.value.replace(/, \d{5},/g, ","),
            district: searchResult.city,
            country: searchResult.country,
            coordinate: {
                latitude: searchResult.latlng.lat,
                longitude: searchResult.latlng.lng
            },
            description: values.description,
            landlordId: 1
        }

        await createRoomBlock(roomBlockRequest)
    }

    useServerMessage({ data: data!, error: error })

    useEffect(() => {
        const searchMap = document.getElementById("search-map")

        if (searchMap) {
            const search = window.placeSearch({
                key: import.meta.env.VITE_PLACE_SEARCH_API_KEY,
                container: searchMap,
                useDeviceLocation: true,
                collection: ["poi", "airport", "address", "adminArea", "city", "country"]
            })

            search.on("change", (e: any) => {
                if (e.result.latlng) {
                    setMapCenter([e.result.latlng.lat, e.result.latlng.lng])
                    setAddress(e.result.name)
                    setSearchResult(e.result)
                    search.close()
                    console.log(e.result)
                }
            })
        }
    }, [])

    return (
        <Spin spinning={isLoading}>
            <div className="mb-6 mt-4 text-center text-2xl font-bold text-secondary">Create Room Block</div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinish}
                layout="horizontal"
                className="flex w-full flex-col items-center"
            >
                <Form.Item className="w-full" name="description" rules={formRoomBlockRules.description}>
                    <Input placeholder="Description" />
                </Form.Item>
                <Form.Item className=" w-full" rules={formRoomBlockRules.address}>
                    <Input
                        id="search-map"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Item>

                <Form.Item className="w-full">
                    <Map center={mapCenter} markerText="This is your address" />
                </Form.Item>

                <Form.Item className="w-full">
                    <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default ModalAdd

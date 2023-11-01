import Map from "@/components/Map"
import { useState, useEffect } from "react"
import { Button, Form, Input, Spin } from "antd"
import "../style.css"

declare global {
    interface Window {
        placeSearch: any
    }
}

const ModalAdd = () => {
    const [mapCenter, setMapCenter] = useState<[number, number]>([16.07408355193989, 108.14989962882427])
    const [address, setAddress] = useState("")

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
                    search.close()
                    console.log(e.result)
                }
            })
        }
    }, [])

    return (
        <Spin spinning={false}>
            <div className="mb-6 mt-4 text-center text-2xl font-bold text-secondary">Create Room Block</div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                className="flex w-full flex-col items-center"
            >
                <Form.Item
                    className="w-full"
                    name="description"
                    rules={[{ required: true, message: "Please input description!" }]}
                >
                    <Input placeholder="Description" />
                </Form.Item>
                <Form.Item className=" w-full" rules={[{ required: true, message: "Please input address!" }]}>
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

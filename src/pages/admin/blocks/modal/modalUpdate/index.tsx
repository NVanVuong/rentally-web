import Map from "@/components/Map"
import { useState, useEffect } from "react"
import { Button, Form, Input, Spin } from "antd"
import { IModal } from "@/interfaces/modal.interface"
import "../style.css"
import { formRoomBlockRules } from "../modalAdd"
import { useUpdateRoomBlockMutation } from "@/redux/services/block/block.service"
import useServerMessage from "@/hooks/useServerMessage"
import { IRoomBlockRequest } from "@/interfaces/block.interface"

declare global {
    interface Window {
        placeSearch: any
    }
}

const ModalUpdate = (props: IModal) => {
    const { data: blockData } = props
    console.log("blockData", blockData)

    const { id, coordinate, address: myAddress, city, country, description, landlord } = blockData || {}
    const [searchResult, setSearchResult] = useState<any>({
        value: myAddress,
        city: city,
        country: country,
        latlng: {
            lat: coordinate.latitude,
            lng: coordinate.longitude
        },
        landlordId: landlord.id
    })
    const [mapCenter, setMapCenter] = useState<[number, number]>(
        coordinate ? [coordinate.latitude, coordinate.longitude] : [16.07408355193989, 108.14989962882427]
    )
    const [address, setAddress] = useState(myAddress)

    const initialValues = {
        id: id,
        description: description
    }

    const [updateRoomBlock, { data, error, isLoading }] = useUpdateRoomBlockMutation()

    const onFinish = async (values: any) => {
        const roomBlockRequest: IRoomBlockRequest = {
            address: searchResult?.value.replace(/, \d{5},/g, ","),
            district: searchResult?.city,
            country: searchResult?.country,
            coordinate: {
                latitude: searchResult?.latlng.lat,
                longitude: searchResult?.latlng.lng
            },
            description: values?.description,
            landlordId: searchResult?.landlordId
        }

        await updateRoomBlock({ id, data: roomBlockRequest })
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
                }
            })
        }
    }, [])

    return (
        <Spin spinning={isLoading}>
            <div className="mb-6 mt-4 text-center text-2xl font-bold text-secondary">Upload Room Block</div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinish}
                layout="horizontal"
                initialValues={initialValues}
                className="flex w-full flex-col items-center"
            >
                <Form.Item className="w-full" name="id">
                    <Input disabled />
                </Form.Item>
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

export default ModalUpdate

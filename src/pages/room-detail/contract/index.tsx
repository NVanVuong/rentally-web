import { DatePicker, Select } from "antd"
import Button from "../components/Button"

interface IContract {
    price: string
}

const Contract = (props: IContract) => {
    return (
        <div className="h-fit w-96 rounded-lg border border-gray-200 px-8 py-6 shadow-lg">
            <span className="text-sm">
                <b className="text-xl font-bold">{props.price},000,000</b> VND/month
            </span>
            <div className="mt-4 flex flex-col rounded-lg border border-gray-300 font-medium">
                <div className="flex border-b">
                    <div className="flex w-full flex-col gap-1 border-r px-4 py-4 text-left text-sm">
                        Move in date
                        <DatePicker className="w-" />
                    </div>
                    <div className="flex w-full flex-col gap-1 border-r px-4 py-4 text-left text-sm">
                        Lease term
                        <Select
                            showSearch
                            placeholder="Select months"
                            optionFilterProp="children"
                            defaultValue={"3"}
                            options={[
                                {
                                    value: "3",
                                    label: "3 months"
                                },
                                {
                                    value: "6",
                                    label: "6 months"
                                },
                                {
                                    value: "9",
                                    label: "9 months"
                                },
                                {
                                    value: "12",
                                    label: "12 months"
                                }
                            ]}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-col gap-1 border-r px-4 py-4 text-left text-sm">
                    Number of tenants
                    <Select
                        showSearch
                        placeholder="Select tenants"
                        optionFilterProp="children"
                        defaultValue={"2"}
                        options={[
                            {
                                value: "1",
                                label: "1 tenant"
                            },
                            {
                                value: "2",
                                label: "2 tenants"
                            },
                            {
                                value: "3",
                                label: "3 tenants"
                            },
                            {
                                value: "4",
                                label: "4 tenants"
                            }
                        ]}
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <Button className="w-full rounded-lg bg-primary py-2  text-white hover:shadow-md hover:shadow-primary/60">
                    Prepare contract
                </Button>
            </div>
        </div>
    )
}

export default Contract

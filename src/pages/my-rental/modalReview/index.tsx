import { Button, Form, Rate, Spin } from "antd"
import Title from "@/components/Modal/Title"
import { useAppSelector } from "@/redux/hook"
import { MODAL } from "@/utils/constants/GlobalConst"
import ModalAntd from "@/components/Modal"
import TextArea from "antd/es/input/TextArea"

const ModalReview = () => {
    const onFinish = async (values: any) => {
        console.log(values)
    }

    const type = useAppSelector((state) => state.modal.type)

    if (type !== MODAL.REVIEW.RENTAL) return null

    return (
        <ModalAntd>
            <Spin spinning={false}>
                <Title>Review room</Title>
                <Form onFinish={onFinish} layout="vertical" className="flex w-full flex-col items-center gap-2">
                    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
                        <Form.Item label="Clean Rate" className="!w-full" name="cleanRate">
                            <Rate defaultValue={5} />
                        </Form.Item>
                        <Form.Item label="Support Rate" className="!w-full" name="supportRate">
                            <Rate defaultValue={5} />
                        </Form.Item>

                        <Form.Item label="Location Rate" className="!w-full" name="locationRate">
                            <Rate defaultValue={5} />
                        </Form.Item>
                        <Form.Item label="Security Rate" className="!w-full" name="securityRate">
                            <Rate defaultValue={5} />
                        </Form.Item>
                    </div>
                    <Form.Item label="Comment" className="!w-full" name="comment">
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item className="w-full">
                        <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </ModalAntd>
    )
}

export default ModalReview

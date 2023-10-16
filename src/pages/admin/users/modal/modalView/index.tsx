import ModalTitle from "@/components/Modal/ModalTitle"
import { IModal } from "@/interfaces/modal.interface"
import { Badge, Descriptions, Image } from "antd"
import "./style.css"
import { formatStatus } from "@/utils/helpers"
import { ROLE_COLORS, RoleType, STATUS_COLORS, StatusType } from "@/utils/constants/GlobalConst"

const ModalView = (props: IModal) => {
    const data = props?.data

    const { id, googleId, email, firstName, lastName, phoneNumber, status, role, photo }: any = data

    return (
        <div className="flex flex-col items-center">
            <ModalTitle />
            <Image width={120} className="rounded-full" src={photo} />
            <Descriptions column={1} className="mt-28">
                <Descriptions.Item className="text-red-500" label="ID">
                    {id}
                </Descriptions.Item>
                <Descriptions.Item label="Google ID">{googleId}</Descriptions.Item>
                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                <Descriptions.Item label="First Name">{firstName}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{lastName}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Badge
                        color={STATUS_COLORS[status as StatusType]}
                        className="flex items-center text-xs font-medium"
                        text={formatStatus(status)}
                    ></Badge>
                </Descriptions.Item>
                <Descriptions.Item
                    contentStyle={{ color: ROLE_COLORS[role as RoleType], fontWeight: "bold" }}
                    label="Role"
                >
                    {role}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ModalView
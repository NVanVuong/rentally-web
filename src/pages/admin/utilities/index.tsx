import PageHeader from "@/container/PageHeader"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import TableManageUtilities from "./TableManageUtilities"
import TableToolbar from "@/container/Toolbar"
import { PAGE } from "@/utils/constants/GlobalConst"
import ModalUtility from "./modal"

const Utility = () => {
    useGetUtilitiesQuery("")
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Utilities Management" />
            <ModalUtility />
            <TableToolbar type={PAGE.UTILITY} />
            <TableManageUtilities />
        </div>
    )
}

export default Utility

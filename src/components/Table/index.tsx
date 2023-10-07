import { ITable } from "@/interfaces/table.interface"
import { Table } from "antd"
import "./styled.css"

const TableAntd = (props: ITable<any>) => {
    return (
        <Table
            pagination={{
                position: ["bottomCenter"],
                pageSize: 8,
                prevIcon: "Previous",
                nextIcon: "Next",
                showSizeChanger: false,
                responsive: true,
                showLessItems: true
            }}
            dataSource={props.dataSource}
            columns={props.columns}
            rowKey={props.rowKey}
        />
    )
}

export default TableAntd

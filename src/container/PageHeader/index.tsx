import avatar from "@/assets/images/avatar.png"

interface IPageHeader {
    title: string
}

const PageHeader = (props: IPageHeader) => {
    return (
        <div className="mb-3 flex w-full items-center justify-between">
            <h1 className="text-2xl font-medium  text-secondary">{props.title}</h1>
            <img src={avatar} className="h-12 w-12 bg-transparent drop-shadow-md" />
        </div>
    )
}

export default PageHeader

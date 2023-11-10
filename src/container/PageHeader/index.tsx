import UserMenu from "../UserMenu"

interface IPageHeader {
    title: string
}

const PageHeader = (props: IPageHeader) => {
    return (
        <div className="mb-3 flex w-full items-center justify-between">
            <h1 className="text-2xl font-medium  text-secondary">{props.title}</h1>
            <UserMenu />
        </div>
    )
}

export default PageHeader

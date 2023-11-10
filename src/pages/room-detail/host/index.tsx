import { ILandlord } from "@/interfaces/user.interface"

interface IHostInformation {
    landlord: ILandlord
}

const HostInformation = ({ landlord }: IHostInformation) => {
    const { name, email, photo, phoneNumber } = landlord

    return (
        <div className="flex gap-20 border-b border-gray-300 pb-4 pl-2 pr-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold">Host information</h1>
                <div className="flex items-center gap-4 text-sm">
                    <span>{name}</span>
                    <span className="text-xs">•</span>
                    <span>Tel +{phoneNumber}</span>
                    <span className="text-xs">•</span>
                    <a className="transition duration-150 hover:text-primary hover:underline" href={`mailto:${email}`}>
                        Mail
                    </a>
                </div>
            </div>
            <div>
                <img className="h-14 w-14 rounded-full border" src={photo} alt="Photo of landlord" />
            </div>
        </div>
    )
}

export default HostInformation

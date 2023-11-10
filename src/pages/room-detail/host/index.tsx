import { ILandlord } from "@/interfaces/user.interface"

interface IHostInformation {
    landlord: ILandlord
}

const HostInformation = ({ landlord }: IHostInformation) => {
    const { name, email, photo, phoneNumber } = landlord

    return (
        <div className="mt-6 flex w-fit items-center gap-20 border-b border-gray-300 pb-2">
            <div className="flex flex-col gap-2">
                <h2 className="font-bold">Host information</h2>
                <div className="justify- flex items-center gap-4 text-sm font-medium">
                    <span>{name}</span>
                    <span className="text-xs">•</span>
                    <span>Tel +{phoneNumber}</span>
                    <span className="text-xs">•</span>
                    <a href={`mailto:${email}`}>Mail</a>
                </div>
            </div>
            <div>
                <img className="h-14 w-14 rounded-full border" src={photo} alt="Photo of landlord" />
            </div>
        </div>
    )
}

export default HostInformation

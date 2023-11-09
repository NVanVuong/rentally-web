import ListingCard from "@/components/Card/ListingCard"
import Header from "@/container/Header"
import { useAppSelector } from "@/redux/hook"
// import HomeMap from "@/components/Map/HomeMap"

const locations = [
    [63.5955, 130.3269],
    [65.5955, 120.3269]
]

const Home = () => {
    const placeInfo = useAppSelector((state) => state.searchMap.placeInfo)
    const { lat, lng } = placeInfo.latlng
    locations.push([lat, lng])

    return (
        <div className="h-screen w-full">
            <div>
                <Header />
            </div>

            {/* <HomeMap locations={locations} /> */}
            <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20 ">
                <div className="grid grid-cols-1 gap-8 pt-24  sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                </div>
            </div>
        </div>
    )
}

export default Home

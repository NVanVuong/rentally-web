import ListingCard from "@/components/Card/ListingCard"
import NavBar from "@/components/Navbar"

const Home = () => {
    return (
        <div>
            <NavBar />
            <div
                className="
        mx-auto
        max-w-[2520px]
        px-4 
        sm:px-2
        md:px-10
        xl:px-20
      "
            >
                <div className="md:grid-cols-3lg:grid-cols-4 grid grid-cols-1  gap-8 pt-24  sm:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6">
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

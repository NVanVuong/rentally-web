import { useGetStatisticRevenueQuery } from "@/redux/services/statistics/statistics.service"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    plugins: {},
    responsive: true,
    interaction: {
        mode: "index" as const,
        intersect: false
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    }
}

// const labels = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "Novemver",
//     "December",
// ]

const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]

const Revenue = () => {
    const { data } = useGetStatisticRevenueQuery({ year: 2023 })

    console.log(data?.data.statistics)

    const statistics = data?.data.statistics
    console.log(statistics)

    const dataRevenue = {
        labels,
        datasets: [
            {
                label: "Revenue",
                data: statistics?.map((entry) => entry.revenue),
                backgroundColor: "#E7894E"
            },
            {
                label: "Electric",
                data: statistics?.map((entry) => entry.electric),
                backgroundColor: "#1D5868"
            },
            {
                label: "Water",
                data: statistics?.map((entry) => entry.water),
                backgroundColor: "#81AAB5"
            },
            {
                label: "Additional Price",
                data: statistics?.map((entry) => entry.additionalPrice),
                backgroundColor: "#d3d3d3"
            }
        ]
    }

    return (
        <div className="h-96 w-full">
            <h1>Revenue</h1>
            <Bar options={options} data={dataRevenue} />
        </div>
    )
}

export default Revenue

import { IRoomDetail } from "@/interfaces/room-detail.interface"

export const roomDetail: IRoomDetail = {
    id: "409142c4-b09d-4e06-875c-d36301b530ad",
    price: "47",
    images: [
        "https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/607235e0-45d3-4450-b507-b9b0477d68d9.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/d675cab7-7269-4e01-b917-10c4f564f6aa.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/7a2002a7-a8dd-4c4e-8da2-e0e4643dcf67.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/e5b3fbfb-4cda-4941-a8ea-0330fbe510ea.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/5d5faa49-e54f-4139-9879-ce0adf6c478b.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/7ece7a2a-e9a6-4953-9d7b-e1160d1112d9.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/52c962d1-fd91-4e22-a25b-53d5faf8be7e.jpeg?im_w=1440"
    ],
    utilities: [
        {
            id: 98,
            name: "Electricity",
            note: "Power supply for the property",
            icon: "https://image-user-public.s3.ap-southeast-2.amazonaws.com/utilities/Electricity.png"
        },
        {
            id: 99,
            name: "Water",
            note: "Hot and cold water supply",
            icon: "https://image-user-public.s3.ap-southeast-2.amazonaws.com/utilities/Water.png"
        },
        {
            id: 100,
            name: "Internet",
            note: "High-speed internet access",
            icon: "https://image-user-public.s3.ap-southeast-2.amazonaws.com/utilities/Internet.png"
        }
    ],
    roomblock: {
        id: 1,
        created_at: "2023-11-08T05:21:19.106Z",
        updated_at: "2023-11-08T05:21:19.106Z",
        address: "8 Hà Văn Tính",
        city: "Đà Nẵng",
        district: "Liên Chiểu",
        country: "VN",
        coordinate: {
            latitude: 63.5955,
            longitude: 130.3269
        },
        description: "Eligendi ara expedita sordeo astrum thema tunc."
    },
    landlord: {
        id: 1,
        photo: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/761.jpg",
        phoneNumber: "251-999-2521 x66518",
        email: "admin@gmail.com",
        name: "Nguyen Van Admin"
    },
    avgRate: 2.3,
    ratings: [
        {
            id: 1,
            createdAt: "2023-11-05T05:48:24.000Z",
            comment:
                "Caput comprehendo bellicus tergeo testimonium corroboro. Aurum suspendo altus tabesco campana verbum una synagoga. Aeger abscido decipio summa.",
            cleanRate: 3,
            locationRate: 3,
            securityRate: 2,
            supportRate: 1,
            avgRate: "2.2500",
            renterName: "Sloth bear American black bear",
            renterPhoto:
                "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1147.jpg"
        }
    ]
}

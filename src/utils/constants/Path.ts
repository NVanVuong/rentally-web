export const SITE_MAP = {
    INDEX: "/",
    AUTH: {
        LOGIN: "login",
        REGISTER: "register",
        FORGOTPASSWORD: "forgot-password",
        RESETPASSWORD: "reset-password/:email"
    },
    ADMIN: "/admin",
    MOD: "/mod",
    USERS_MANAGEMENT: "users",
    MODS_MANAGEMENT: "mods",
    ROOMS_MANAGEMENT: "blocks/:id/rooms",
    ROOMS_GENERATION: "blocks/:id/rooms/generate-rooms",
    PROPS_MANAGEMENT: "props",
    BLOCKS_MANAGEMENT: "blocks",
    UTILITIES_MANAGEMENT: "utilities",
    TRANSACTION_MANAGEMENT: "transactions",
    ROOM: "room",
    ROOM_DETAIL: "room/:id",
    RENT: "rental",
    RENT_DETAIL: "rental/:id",
    RENTALS: "rentals",
    MY_RENTAL: "my-rental",
    MY_RENTAL_DETAIL: "my-rental/:id",
    MY_CHECKLIST: "/my-checklist",
    MY_PROFILE: "/my-profile",
    BECOME_HOST: "/become-host"
}

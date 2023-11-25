export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL as string
export const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID as string

export enum ROLE {
    USER = "USER",
    MOD = "MOD",
    ADMIN = "ADMIN"
}

export enum ROOM_STATUS {
    EMPTY = "Empty",
    OCCUPIED = "Occupied"
}

export enum STATUS {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
    REGISTING = "REGISTING"
}

export enum STATUS_RENTAL {
    CREATED = "CREATED",
    APPROVED = "APPROVED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
    REQUEST_BREAK = "REQUEST_BREAK",
    BROKEN = "BROKEN",
    ENDED = "ENDED"
}

export const STATUS_RENTAL_ORDER: STATUS_RENTAL[] = [
    STATUS_RENTAL.CREATED,
    STATUS_RENTAL.APPROVED,
    STATUS_RENTAL.COMPLETED,
    STATUS_RENTAL.CANCELED,
    STATUS_RENTAL.REQUEST_BREAK,
    STATUS_RENTAL.BROKEN,
    STATUS_RENTAL.ENDED
]

export const ROLE_COLORS = {
    [ROLE.USER]: "#2C839A",
    [ROLE.MOD]: "#1D5868",
    [ROLE.ADMIN]: "#E36414"
}

export const RENTAL_COLORS: Record<STATUS_RENTAL, string> = {
    [STATUS_RENTAL.CREATED]: "#3498db", // Blue
    [STATUS_RENTAL.APPROVED]: "#27ae60", // Green
    [STATUS_RENTAL.COMPLETED]: "#f39c12", // Orange
    [STATUS_RENTAL.CANCELED]: "#e74c3c", // Red
    [STATUS_RENTAL.REQUEST_BREAK]: "#f1c40f", // Yellow
    [STATUS_RENTAL.BROKEN]: "#c0392b", // Dark Red
    [STATUS_RENTAL.ENDED]: "#2ecc71" // Emerald Green
}

export type RoleType = keyof typeof ROLE_COLORS

export enum PAGE {
    USER = "USER",
    ROOM = "ROOM",
    BLOCK = "BLOCK",
    UTILITY = "UTILITY",
    RENTAL = "RENTAL"
}

export const STATUS_COLORS = {
    [STATUS.ACTIVE]: "green",
    [STATUS.DISABLED]: "red",
    [STATUS.REGISTING]: "blue"
}

export type StatusType = keyof typeof STATUS_COLORS
export type StatusRentalType = keyof typeof RENTAL_COLORS

export const ROOM_STATUS_COLORS = {
    [ROOM_STATUS.OCCUPIED]: "green",
    [ROOM_STATUS.EMPTY]: "red"
}

export type RoomStatusType = keyof typeof ROOM_STATUS_COLORS

export const MODAL = {
    ADD: {
        USER: "ADD_USER",
        ROOM: "ADD_ROOM",
        BLOCK: "ADD_BLOCK",
        UTILITY: "ADD_UTILITY"
    },
    UPDATE: {
        USER: "UPDATE_USER",
        ROOM: "UPDATE_ROOM",
        BLOCK: "UPDATE_BLOCK",
        UTILITY: "UPDATE_UTILITY",
        RENTAL: "UPDATE_RENTAL"
    },
    DELETE: {
        USER: "DELETE_USER",
        ROOM: "DELETE_ROOM",
        BLOCK: "DELETE_BLOCK",
        UTILITY: "DELETE_UTILITY"
    },
    DISABLE: {
        USER: "DISABLE_USER",
        ROOM: "DISABLE_ROOM",
        BLOCK: "DISABLE_BLOCK"
    },
    ENABLE: {
        USER: "ENABLE_USER",
        ROOM: "ENABLE_ROOM",
        BLOCK: "ENABLE_BLOCK"
    },
    VIEW: {
        USER: "VIEW_USER",
        ROOM: "VIEW_ROOM",
        BLOCK: "VIEW_BLOCK",
        RENTAL: "VIEW_RENTAL"
    },
    SHARE: {
        ROOM_DETAIL: "SHARE_ROOM_DETAIL"
    },
    FILTER: {
        ROOM_FINDING: "ROOM_FINDING_FILTER"
    },
    RENTAL: {
        END: "END_RENTAL",
        APPROVE: "APPROVE_RENTAL",
        CANCEL: "CANCEL_RENTAL",
        ACCEPT_BREAK: "ACCEPT_BREAK_RENTAL"
    }
} as const

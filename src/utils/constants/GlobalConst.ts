export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL as string
export const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID as string

export enum ROLE {
    USER = "USER",
    MOD = "MOD",
    ADMIN = "ADMIN"
}

export const ROLE_COLORS = {
    [ROLE.USER]: "#2C839A",
    [ROLE.MOD]: "#1D5868",
    [ROLE.ADMIN]: "#E36414"
}

export enum USER_STATUS {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
    REGISTING = "REGISTING"
}

export const USER_STATUS_COLORS = {
    [USER_STATUS.ACTIVE]: "green",
    [USER_STATUS.DISABLED]: "red",
    [USER_STATUS.REGISTING]: "blue"
}

export enum RENTAL_STATUS {
    CREATED = "CREATED",
    APPROVED = "APPROVED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
    REQUEST_BREAK = "REQUEST_BREAK",
    BROKEN = "BROKEN",
    ENDED = "ENDED"
}

export const RENTAL_STATUS_TEXT: Record<RENTAL_STATUS, string> = {
    CREATED: "Created",
    APPROVED: "Approved",
    COMPLETED: "Completed",
    CANCELED: "Canceled",
    REQUEST_BREAK: "Request Break",
    BROKEN: "Broken",
    ENDED: "Ended"
}

export const RENTAL_STATUS_COLORS: Record<RENTAL_STATUS, string> = {
    [RENTAL_STATUS.CREATED]: "#3498db",
    [RENTAL_STATUS.APPROVED]: "#27ae60",
    [RENTAL_STATUS.COMPLETED]: "#f39c12",
    [RENTAL_STATUS.CANCELED]: "#b2b2b2",
    [RENTAL_STATUS.REQUEST_BREAK]: "#f1c40f",
    [RENTAL_STATUS.BROKEN]: "#c0392b",
    [RENTAL_STATUS.ENDED]: "#e74c3c"
}

export enum ROOM_STATUS {
    EMPTY = "Empty",
    OCCUPIED = "Occupied"
}

export const ROOM_STATUS_COLORS = {
    [ROOM_STATUS.OCCUPIED]: "green",
    [ROOM_STATUS.EMPTY]: "red"
}

export type RoleType = keyof typeof ROLE_COLORS
export type UserStatusType = keyof typeof USER_STATUS_COLORS
export type RentalStatusType = keyof typeof RENTAL_STATUS_COLORS
export type RoomStatusType = keyof typeof ROOM_STATUS_COLORS

export enum PAGE {
    USER = "USER",
    ROOM = "ROOM",
    BLOCK = "BLOCK",
    UTILITY = "UTILITY",
    RENTAL = "RENTAL"
}

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
        RENTAL: "UPDATE_RENTAL",
        PASSWORD: "UPDATE_PASSWORD"
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
    },
    REVIEW: {
        RENTAL: "REVIEW_RENTAL"
    }
} as const

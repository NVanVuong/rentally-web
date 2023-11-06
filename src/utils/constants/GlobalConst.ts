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

export const ROLE_COLORS = {
    [ROLE.USER]: "#2C839A",
    [ROLE.MOD]: "#1D5868",
    [ROLE.ADMIN]: "#E36414"
}

export type RoleType = keyof typeof ROLE_COLORS


export enum PAGE {
    USER = "USER",
    ROOM = "ROOM",
    BLOCK = "BLOCK"
}

export const STATUS_COLORS = {
    [STATUS.ACTIVE]: "green",
    [STATUS.DISABLED]: "red",
    [STATUS.REGISTING]: "blue"
}

export type StatusType = keyof typeof STATUS_COLORS

export const ROOM_STATUS_COLORS = {
    [ROOM_STATUS.OCCUPIED]: "green",
    [ROOM_STATUS.EMPTY]: "red"
}

export type RoomStatusType = keyof typeof ROOM_STATUS_COLORS

export const MODAL = {
    ADD: {
        USER: "ADD_USER",
        ROOM: "ADD_ROOM",
        BLOCK: "ADD_BLOCK"
    },
    UPDATE: {
        USER: "UPDATE_USER",
        ROOM: "UPDATE_ROOM",
        BLOCK: "UPDATE_BLOCK"
    },
    DELETE: {
        USER: "DELETE_USER",
        ROOM: "DELETE_ROOM",
        BLOCK: "DELETE_BLOCK"
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
        BLOCK: "VIEW_BLOCK"
    }
} as const

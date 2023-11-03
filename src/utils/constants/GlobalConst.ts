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

export enum MODAL {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    DISABLE = "DISABLE",
    ENABLE = "ENABLE",
    VIEW = "VIEW"
}

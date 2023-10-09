export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL as string

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

export type RoleType = keyof typeof ROLE_COLORS

export enum STATUS {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
    REGISTING = "REGISTING"
}

export const STATUS_COLORS = {
    [STATUS.ACTIVE]: "green",
    [STATUS.DISABLED]: "red",
    [STATUS.REGISTING]: "blue"
}

export type StatusType = keyof typeof STATUS_COLORS

export enum MODAL {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    DISABLE = "DISABLE",
    ENABLE = "ENABLE",
    VIEW = "VIEW"
}

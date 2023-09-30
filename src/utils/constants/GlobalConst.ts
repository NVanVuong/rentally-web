export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL as string

export enum ROLE {
    USER = "USER",
    MOD = "MOD",
    ADMIN = "ADMIN"
}

export enum MODAL {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    DISABLE = "DISABLE",
    VIEW = "VIEW"
}

import {useMutation} from "@tanstack/react-query";
import {RestError} from "@/api/rest";

export interface LoginResponse {
    userId: number,
    username: string,
    password: string,
    email: string,
    avatar?: string,
    phone?: number
}

export interface LoginParameter {
    password: string,
    emailOrPhone: string,
}
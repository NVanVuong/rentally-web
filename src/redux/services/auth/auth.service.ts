import { creatApiWithAuth } from "../apiWithAuth.service";

export const authApi = creatApiWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body: { email: string; password: string }) => ({
				url: '/auth/email/login',
				method: 'POST',
				body,
			}),
		}),
		register: builder.mutation({
			query: (body: {
				name: string;
				email: string;
				password: string;
			}) => {
				return {
					url: '/user/signup',
					method: 'post',
					body,
				};
			},
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

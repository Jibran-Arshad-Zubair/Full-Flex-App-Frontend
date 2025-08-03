import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().user?.authUser?.token || localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    getOtherUsers: builder.query({
      query: (id) => ({
        url: `/users/get-other-users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetOtherUsersQuery,
} = authApi;

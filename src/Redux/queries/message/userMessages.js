import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
   baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.authUser?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Message"], 
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ id, body }) => ({
        url: `/messages/send-message/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Message"],
    }),

    getMessage: builder.query({
      query: (id) => ({
        url: `/messages/get-message/${id}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessageQuery,
} = messagesApi;

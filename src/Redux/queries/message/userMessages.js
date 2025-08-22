import { injectApiEndpoints } from "../../api";

const url = "/messages";
const appendUrl = (segment = "") => `${url}/${segment}`;

export const messagesApi = injectApiEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ id, body }) => ({
        url: appendUrl(`send-message/${id}`),
        method: "POST",
        body,
      }),
      invalidatesTags: ["Message"],
    }),

    getMessage: builder.query({
      query: (id) => ({
        url: appendUrl(`get-message/${id}`),
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

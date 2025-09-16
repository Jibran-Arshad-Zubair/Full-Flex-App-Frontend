import { injectApiEndpoints } from "../../api";

const url = "/chatBot";
const appendUrl = (segment = "") => `${url}/${segment}`;

export const chatBotApi = injectApiEndpoints({
  endpoints: (builder) => ({
    askChatBot: builder.mutation({
      query: (message) => ({
        url: appendUrl("chat"),
        method: "post",
        body: { message }, 
      }),
    }),
  }),
});

export const { useAskChatBotMutation } = chatBotApi;

import { FileText } from "lucide-react";
import { injectApiEndpoints } from "../../api";

const url = "/chatBot";
const appendUrl = (segment = "") => `${url}/${segment}`;

export const chatBotApi = injectApiEndpoints({
  endpoints: (builder) => ({
    askChatBot: builder.mutation({
      query: ({ message, fileText })=> ({
        url: appendUrl("chat"),
        method: "post",
        body: { message , fileText }, 
      }),
    }),
  }),
});

export const { useAskChatBotMutation } = chatBotApi;

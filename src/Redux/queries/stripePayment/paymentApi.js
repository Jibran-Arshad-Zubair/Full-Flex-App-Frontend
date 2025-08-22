import { injectApiEndpoints } from "../../api";

const url = "/payments";
const appendUrl = (segment = "") => `${url}/${segment}`;
export const paymentApi =  injectApiEndpoints({
 
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (paymentData) => ({
        url: appendUrl("create-payment-intent"),
        method: 'post',
        body: paymentData
      })
      
    })
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
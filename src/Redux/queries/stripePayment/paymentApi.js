import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_STRIPE_API_KEY || 'http://localhost:5000/api/v1';

export const paymentApi = createApi ({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL}),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (paymentData) => ({
        url: '/payments/create-payment-intent',
        method: 'POST',
        body: paymentData
      })
      
    })
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
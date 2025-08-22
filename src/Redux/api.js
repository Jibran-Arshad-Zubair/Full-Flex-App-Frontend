import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosError } from "axios";
import { del, get, patch, post, put } from "../utils/api_Helpers";


const methods = {
  get: get,
  post: post,
  put: put,
  delete: del,
  patch: patch,
};

const baseQuery = async ({ method = "get", ...args }) => {
  try {
    if (!methods[method]) {
      throw new Error("Method not found");
    }
    if (!args) {
      throw new Error("Arguments not found");
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await methods[method](...Object.values(args), config);
    return {
      data: res.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: error.response?.data || error.message,
      };
    }

    return { error };
  }
};


const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["User", "Message", "Course", "Payment", "Stripe"],
  baseQuery,
  endpoints: () => ({}),
});

export const {
  reducer: apiReducer,
  middleware: apiMiddleware,
  reducerPath: apiReducerPath,
  injectEndpoints: injectApiEndpoints,
} = baseApi;

export default baseApi;

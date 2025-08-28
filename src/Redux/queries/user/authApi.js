import { injectApiEndpoints } from "../../api";

const url = "/users";
const appendUrl = (segment = "") => `${url}/${segment}`;

export const authApi = injectApiEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: appendUrl("register"),
        method: "post",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: appendUrl("login"),
        method: "post",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    loginWithGoogle: builder.mutation({
      query: (body) => ({
        url: appendUrl("google-login"),
        method: "post",
        body,
        // auth: true,
      }),
      invalidatesTags: ["User"],
    }),

    getOtherUsers: builder.query({
      query: (id) => {
        return {
          url: appendUrl(`get-other-users/${id}`),
          method: "get",
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        };
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: appendUrl(`update/${id}`), 
        method: "put",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: appendUrl("forgot-password"),
        method: "post",
        body,
        auth: true,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: appendUrl("change-password"),
        method: "put",
        body,
        auth: true,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoginWithGoogleMutation,
  useGetOtherUsersQuery,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = authApi;

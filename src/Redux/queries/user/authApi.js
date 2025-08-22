import { injectApiEndpoints } from "../../api";

const url = "/users";
const appendUrl = (segment = "") => `${url}/${segment}`;

export const authApi =  injectApiEndpoints({

  endpoints: (builder) =>  ({
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
    getOtherUsers: builder.query({
      query: (id) => ({
        url: appendUrl(`get-other-users/${id}`),
        method: "get",
      }),
      providesTags: ["User"],
    }),
      updateUser: builder.mutation({
      query: (userData) => ({
        url: appendUrl(`/update/${userData._id}`),
        method: "put",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetOtherUsersQuery,
  useUpdateUserMutation,
} = authApi;

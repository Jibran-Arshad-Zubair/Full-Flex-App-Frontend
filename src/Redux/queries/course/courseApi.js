import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/courses",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.authUser?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/create",
        method: "POST",
        body: courseData,
      }),
    }),
    getAllCourses: builder.query({
      query: () => "/get-all",
    }),
    getSingleCourse: builder.query({
      query: (id) => `/get-by-id/${id}`,
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useDeleteCourseMutation,
} = courseApi;

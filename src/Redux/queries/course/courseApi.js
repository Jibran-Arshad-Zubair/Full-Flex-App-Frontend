import { injectApiEndpoints } from "../../api";

const url = "/courses";
const appendUrl = (segment = "") => `${url}/${segment}`;

export const courseApi = injectApiEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: appendUrl("create"),
        method: "post",
        body: courseData,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: appendUrl("get-all"),
        method: "get",
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Course", id })),
              { type: "Course", id: "LIST" },
            ]
          : [{ type: "Course", id: "LIST" }],
    }),
    getSingleCourse: builder.query({
      query: (id) => ({
        url: appendUrl(`get-by-id/${id}`),
        method: "get",
      }),
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: appendUrl(`delete/${id}`),
        method: "delete",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Course", id },
        { type: "Course", id: "LIST" },
      ],
    }),

    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: appendUrl(`update/${id}`),
        method: "put",
        body: data,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;

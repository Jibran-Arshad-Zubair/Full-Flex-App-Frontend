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
    }),
    getAllCourses: builder.query({
      query: () => appendUrl("get-all"),
    }),
    getSingleCourse: builder.query({
      query: (id) => appendUrl(`get/${id}`),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: appendUrl(`delete/${id}`),
        method: "delete",
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

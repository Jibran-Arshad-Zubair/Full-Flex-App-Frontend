import React, { useState } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { FiUpload, FiX, FiPlus, FiTrash2 } from "react-icons/fi";

const CreateCourseModal = ({ isOpen, onClose, onSubmit }) => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    price: "",
    thumbnail: null,
    category: "",
    videos: [{ title: "", url: "",}],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be positive"),
      thumbnail: Yup.mixed().required("Thumbnail is required"),
  });

  const categories = [
    { value: "web-development", label: "Web Development" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "other", label: "Other" },
  ];

  const handleThumbnailChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("thumbnail", file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <Card className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-gray-900">
                Create New Course
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form>
                  <div className="space-y-4">
                    <InputField
                      label="Course Title"
                      name="title"
                      type="text"
                      placeholder="e.g., Gen AI "
                    />

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="Describe your course..."
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <InputField
                          label="Price"
                          name="price"
                          type="number"
                          placeholder="e.g., 2999"
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <SelectField name="category" options={categories} />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thumbnail
                      </label>
                      <div className="mt-1 flex items-center">
                        <label className="cursor-pointer">
                          <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <FiUpload className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                            Upload
                          </span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={(e) =>
                              handleThumbnailChange(e, setFieldValue)
                            }
                            accept="image/*"
                          />
                        </label>
                        {thumbnailPreview && (
                          <div className="ml-4 relative">
                            <img
                              src={thumbnailPreview}
                              alt="Thumbnail preview"
                              className="h-16 w-16 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setThumbnailPreview(null);
                                setFieldValue("thumbnail", null);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <FieldArray name="videos">
                      {({ push, remove }) => (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium text-gray-700">
                              Course Videos
                            </h4>
                            <button
                              type="button"
                              onClick={() =>
                                push({ title: "", url: "", duration: "" })
                              }
                              className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                              <FiPlus className="inline mr-1" /> Add Video
                            </button>
                          </div>

                          {values.videos.map((video, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 rounded-lg p-4"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="text-sm font-medium">
                                  Video {index + 1}
                                </h5>
                                {values.videos.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FiTrash2 className="h-4 w-4" />
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 gap-4">
                                <InputField
                                  label="Title"
                                  name={`videos.${index}.title`}
                                  type="text"
                                  placeholder="e.g., Introduction to React"
                                />
                                <InputField
                                  label="Video URL"
                                  name={`videos.${index}.url`}
                                  type="url"
                                  placeholder="https://example.com/video"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      type="button"
                      onClick={onClose}
                      className="bg-gray-400 text-gray-700 hover:bg-gray-500"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      {isSubmitting ? "Creating..." : "Create Course"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateCourseModal;

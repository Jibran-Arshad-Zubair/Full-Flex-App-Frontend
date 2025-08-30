import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../components/ui/InputField";
import SelectField from "../components/ui/SelectField";
import Button from "../components/ui/Buttonlogin";
import { useRegisterUserMutation } from "../Redux/queries/user/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from "../assets/e-learning-logo.png";
import {FaUser,FaUserCircle,  FaEnvelope,  FaLock,  FaPhoneAlt,  FaVenusMars,} from "react-icons/fa";
const SignupPage = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const initialValues = {
    email: "",
    userName: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    gender: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    userName: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits")
      .max(15, "Must be at most 15 digits")
      .required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await registerUser(values).unwrap();
      console.log("Registration successful:", response);

      toast.success(
        "Account created successfully! Redirecting...",
        response,
        {}
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("errorrrrr", err);
      const errorMessage = err.data?.message || "Registration failed";

      toast.error(errorMessage, {
        duration: 5000,
      });

      if (err.status === 409 || errorMessage.includes("email already exists")) {
        setFieldError("email", "Email already exists");
      } else if (errorMessage) {
        setFieldError("root", errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };
  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-cyan-400 to-blue-600">
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Welcome!</h2>
                <p className="text-indigo-100">
                  Join our community and unlock amazing features.
                </p>
                <div className="mt-4">
                  <div className="w-24 h-24 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="h-12 w-12 object-contain rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 w-full md:w-1/2">
            <div className="flex justify-center mb-6 md:hidden">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Create Your Account
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <InputField
                    label="Full Name"
                    name="fullName"
                    type="text"
                    placeholder="Jibran Arshad"
                    icon={<FaUser className="h-5 w-5 text-gray-400" />}
                  />

                  <InputField
                    label="Username"
                    name="userName"
                    type="text"
                    placeholder="jibran"
                    icon={<FaUserCircle className="h-5 w-5 text-gray-400" />}
                  />

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="jibran@example.com"
                    icon={<FaEnvelope className="h-5 w-5 text-gray-400" />}
                  />

                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    icon={<FaLock className="h-5 w-5 text-gray-400" />}
                  />

                  <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    placeholder="03445*******"
                    icon={<FaPhoneAlt className="h-5 w-5 text-gray-400" />}
                  />
                  <SelectField
                    label="Gender"
                    name="gender"
                    options={genderOptions}
                    icon={<FaVenusMars className="h-5 w-5 text-gray-400" />}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

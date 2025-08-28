import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  useLoginUserMutation,
  useLoginWithGoogleMutation,
} from "../Redux/queries/user/authApi";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../Redux/reduxSlices/userSlice";
import { FaUserCircle, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import Logo from "../assets/e-learning-logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import ForgotPasswordModal from "../components/ui/ForgotPasswordModal";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const [loginWithGoogle] = useLoginWithGoogleMutation();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await loginUser(values).unwrap();
      toast.success("Login successful", { duration: 3000 });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      dispatch(setAuthUser(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("authUser", JSON.stringify(response.data.user));
    } catch (err) {
      console.error("Login error", err);
      const errorMessage = err.data?.message || "Login failed";
      toast.error(errorMessage, { duration: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential;
      if (!token) {
        throw new Error("No token received from Google");
      }

      const response = await loginWithGoogle({ token }).unwrap();

      toast.success("Login successful", { duration: 3000 });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      dispatch(setAuthUser(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("authUser", JSON.stringify(response.data.user));
    } catch (err) {
      console.error("Login error", err);
      const errorMessage = err.data?.message || "Login failed";
      toast.error(errorMessage, { duration: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="hidden md:block md:w-1/2 bg-gradient-to-b from-cyan-400 to-blue-600">
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Welcome Back!
                </h2>
                <p className="text-indigo-100">
                  Continue your journey with us.
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
                <FaUserCircle className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Login to Your Account
            </h1>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed")}
            />

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    icon={<FaEnvelope className="h-5 w-5 text-gray-400" />}
                  />

                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    icon={<FaLock className="h-5 w-5 text-gray-400" />}
                  />

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a
                        onClick={() => setIsForgotPasswordOpen(true)}
                        className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
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
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/signup"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
};

export default LoginPage;

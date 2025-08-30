import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import InputField from './InputField';
import Button from './Button';
import { FiX, FiMail, FiLock, FiRefreshCw } from 'react-icons/fi';
import { useForgetPasswordMutation, useSendOTPMutation } from '../../Redux/queries/user/authApi';
import toast from 'react-hot-toast';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation();
  const [sendOTP, { isLoading: isOTPLoading }] = useSendOTPMutation();

  // Step 1: Email validation schema
  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required')
  });

  // Step 2: OTP and password validation schema
  const resetValidationSchema = Yup.object({
    otp: Yup.string()
      .required('OTP is required')
      .length(6, 'OTP must be 6 digits'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  // Handle email submission
  const handleEmailSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await sendOTP({ email: values.email }).unwrap();
      
      if (response.success) {
        setEmail(values.email);
        setStep(2);
        toast.success('OTP sent to your email successfully!');
      } else {
        throw new Error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.data?.message || error.message || 'Something went wrong. Please try again.';
      setFieldError('email', errorMsg);
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle OTP and password submission
  const handleResetSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const resetData = {
        email,
        otp: values.otp,
        newPassword: values.newPassword
      };
      
      const response = await forgotPassword(resetData).unwrap();
      
      if (response.success) {
        toast.success('Password reset successfully!');
        onClose();
      } else {
        throw new Error(response.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.data?.message || error.message || 'Something went wrong. Please try again.';
      
      if (errorMsg.toLowerCase().includes('otp')) {
        setFieldError('otp', errorMsg);
      } else {
        setFieldError('confirmPassword', errorMsg);
      }
      
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      const response = await sendOTP({ email }).unwrap();
      
      if (response.success) {
        toast.success('New OTP sent to your email!');
      } else {
        throw new Error(response.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.data?.message || error.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
          onClick={handleClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {step === 1 ? 'Reset Your Password' : 'Create New Password'}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {step === 1 ? (
              <Formik
                initialValues={{ email: '' }}
                validationSchema={emailValidationSchema}
                onSubmit={handleEmailSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                        <FiMail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Forgot your password?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter your email address and we'll send you an OTP to reset your password.
                      </p>
                    </div>

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      icon={<FiMail className="text-gray-400" />}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting || isOTPLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base font-medium"
                    >
                      {isOTPLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending OTP...
                        </div>
                      ) : (
                        'Send OTP'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{ otp: '', newPassword: '', confirmPassword: '' }}
                validationSchema={resetValidationSchema}
                onSubmit={handleResetSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-4">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Verify Your Identity
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter the OTP sent to {email} and your new password.
                      </p>
                    </div>

                    {/* OTP Field */}
                    <div>
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        OTP Code
                      </label>
                      <Field
                        name="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      {errors.otp && touched.otp && (
                        <div className="mt-1 text-sm text-red-600">{errors.otp}</div>
                      )}
                    </div>

                    {/* Resend OTP Link */}
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isOTPLoading}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center justify-end"
                      >
                        <FiRefreshCw className={`mr-1 ${isOTPLoading ? 'animate-spin' : ''}`} />
                        {isOTPLoading ? 'Resending OTP...' : 'Resend OTP'}
                      </button>
                    </div>

                    {/* New Password Field */}
                    <InputField
                      label="New Password"
                      name="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      icon={<FiLock className="text-gray-400" />}
                    />

                    {/* Confirm Password Field */}
                    <InputField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      icon={<FiLock className="text-gray-400" />}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base font-medium mt-2"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Resetting Password...
                        </div>
                      ) : (
                        'Reset Password'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Remember your password?{' '}
              <button
                type="button"
                onClick={handleClose}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Back to login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
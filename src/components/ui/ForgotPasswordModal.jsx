import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from './InputField';
import Button from './Button';
import { FiX, FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useForgotPasswordMutation } from '../../Redux/queries/user/authApi';
import toast from 'react-hot-toast';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const initialValues = {
    email: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await forgotPassword(values).unwrap();
      
      if (response.success) {
        setIsSubmitted(true);
        resetForm();
        toast.success(response.message || 'Password reset email sent successfully!');
      } else {
        throw new Error(response.message || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.data?.message || error.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
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
                {isSubmitted ? 'Check Your Email' : 'Reset Your Password'}
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
            {isSubmitted ? (
              <SuccessMessage onClose={handleClose} />
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                        Enter your email address and we'll send you a link to reset your password.
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
                      disabled={isSubmitting || isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base font-medium"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </div>

          {/* Footer */}
          {!isSubmitted && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                <FiAlertCircle className="inline mr-1 h-3 w-3" />
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
          )}
        </div>
      </div>
    </div>
  );
};

// Success Message Component
const SuccessMessage = ({ onClose }) => (
  <div className="text-center py-6">
    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
      <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
    </div>
    
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      Check Your Email
    </h4>
    
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
      We've sent a password reset link to your email address. 
      The link will expire in 1 hour for security reasons.
    </p>

    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
      <p className="text-xs text-blue-800 dark:text-blue-200">
        💡 <strong>Tip:</strong> Check your spam folder if you don't see the email within a few minutes.
      </p>
    </div>

    <Button
      onClick={onClose}
      className="w-full bg-blue-600 hover:bg-blue-700 py-3"
    >
      Return to Login
    </Button>
  </div>
);

export default ForgotPasswordModal;
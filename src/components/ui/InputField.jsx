import React, { useState } from 'react';
import { ErrorMessage, Field } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({ label, name, type, placeholder, icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Field
          type={inputType}
          name={name}
          id={name}
          placeholder={placeholder}
         className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full ${
  icon ? "pl-10" : "pl-3"
} ${type === 'password' ? 'pr-10' : 'pr-3'} sm:text-sm border-gray-300 dark:border-gray-600 rounded-md py-2 border dark:bg-gray-700 dark:text-gray-200`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            )}
          </button>
        )}
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 dark:text-red-400 text-sm mt-1" />
    </div>
  );
};

export default InputField;
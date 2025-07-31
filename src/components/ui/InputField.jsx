import React from 'react';
import { ErrorMessage } from 'formik';

const InputField = ({ label, name, type, placeholder, icon, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 sm:text-sm border-gray-300 rounded-md py-2 border`}
          {...props}
        />
      </div>
      <ErrorMessage name={name}>
        {(msg) => <p className="mt-1 text-sm text-red-600">{msg}</p>}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
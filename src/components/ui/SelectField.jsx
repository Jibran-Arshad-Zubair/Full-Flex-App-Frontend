import React from 'react';
import { ErrorMessage, Field } from 'formik';

const SelectField = ({ label, name, options, icon }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <Field
          as="select"
          name={name}
          id={name}
          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
            >
              {option.label}
            </option>
          ))}
        </Field>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default SelectField;
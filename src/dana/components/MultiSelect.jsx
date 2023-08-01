import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';

const MultiSelect = ({ label, name, options, ...rest }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value) => {
    helpers.setValue(value);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '3rem',
      borderRadius: '0.5rem',
      borderColor: 'rgba(209, 213, 219, var(--tw-border-opacity))',
      '&:hover': { borderColor: '#245A95' },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#d1d5db',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#1f2937',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#1f2937',
      '&:hover': { backgroundColor: '#245A95', color: '#fff' },
    }),
  };

  return (
    <div className="">
      <label htmlFor={name} className="block text-[#245A95] font-bold mb-1">
        {label}
      </label>
      <Select
        id={name}
        name={name}
        options={options}
        isMulti
        value={field.value}
        onChange={handleChange}
        onBlur={field.onBlur}
        className="border-1 border-gray-300 rounded-xl py-3 bg-transparet"
        classNamePrefix="select"
        placeholder='Usuario'
        styles={customStyles}
        
        {...rest}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MultiSelect;
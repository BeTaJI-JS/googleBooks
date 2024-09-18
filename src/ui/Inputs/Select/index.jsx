import React from 'react';

const Select = ({ name, options, className }) => {
  const defaultOption = [{ value: '', label: 'Выберите значение' }];

  return (
    <div className={className}>
      <label>{name}</label>
      <select name={name} disabled={options.length === 0}>
        {options.length &&
          [...defaultOption, ...options].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;

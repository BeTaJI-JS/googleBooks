import React, { useMemo } from 'react';

const Select = ({ name, options, className }) => {
  const inputOptions = useMemo(() => [{ value: '', label: 'Выберите значение' }, ...options], [options]);

  return (
    <div className={className}>
      <label>{name}</label>
      <select name={name} disabled={options.length === 0}>
        {options.length &&
          inputOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;

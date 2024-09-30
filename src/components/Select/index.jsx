// import React, { useMemo } from 'react';

// const Select = ({ name, options, className, onChange }) => {
//   const inputOptions = useMemo(() => [{ value: '', label: 'Выберите значение' }, ...options], [options]);

//   return (
//     <div className={className}>
//       <label>{name}</label>
//       <select name={name} disabled={options.length === 0} onChange={(e) => onChange(e.target.value)}>
//         {options.length &&
//           inputOptions.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//       </select>
//     </div>
//   );
// };

// export default Select;
import cn from 'classnames';
import React, { useMemo, useState, useEffect } from 'react';
import styles from './styles.module.scss';

const Select = ({ name, options, className, onChange, value }) => {
  const [selectedValue, setSelectedValue] = useState(value || '');

  const inputOptions = useMemo(() => [{ value: '', label: 'Выберите значение' }, ...options], [options]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <div className={cn(className, styles.selectWrapper)}>
      <label>{name}</label>
      <select name={name} value={selectedValue} disabled={options.length === 0} onChange={handleChange}>
        {inputOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

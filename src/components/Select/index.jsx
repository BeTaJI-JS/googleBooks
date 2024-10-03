import cn from 'classnames';
import { useMemo } from 'react';
import styles from './styles.module.scss';

const Select = ({ name, options, className, onChange, value }) => {
  const inputOptions = useMemo(() => [{ value: '', label: 'Выберите значение' }, ...options], [options]);

  return (
    <div className={cn(className, styles.selectWrapper)}>
      <label>{name}</label>
      <select name={name} value={value || ''} disabled={options.length === 0} onChange={onChange}>
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

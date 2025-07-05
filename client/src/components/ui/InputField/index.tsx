import React from 'react';
import './styles.scss';

type InputFieldType = {
  name: string
  type: string
  placeholder: string
  value: string
  error: string
  handleChange: (name: string, value: string) => void
}

const InputField = ({ name, type, placeholder, value, error, handleChange} : InputFieldType) => {
  return (
    <div className='form-content'>
      <div className='form-field'>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default InputField;

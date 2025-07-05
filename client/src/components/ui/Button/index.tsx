import React from 'react';
import './styles.scss';

type ButtonType = {
  title: string
  type: "submit" | "button" | "reset" ;
}

const Button = ({ title, type }: ButtonType) => {
  return (
    <div className='button-field'>
      <button
        className='button'
        type={type}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;

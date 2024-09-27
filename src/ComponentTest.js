import React from 'react';
import propTypes from 'prop-types';

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>
    {label}
  </button>
);


Button.propTypes = {
  label: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default Button;

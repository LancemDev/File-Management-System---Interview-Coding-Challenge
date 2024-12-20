import React from 'react';

const ActionButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;


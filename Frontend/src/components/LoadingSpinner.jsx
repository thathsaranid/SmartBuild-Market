import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClass = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  }[size] || 'h-10 w-10';

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClass}`}></div>
    </div>
  );
};

export default LoadingSpinner; 
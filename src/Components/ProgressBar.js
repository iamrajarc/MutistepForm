import React from 'react';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

const ProgressBar = ({ step }) => {
  const progress = (step - 1) * 33.33;

  return (
    <BootstrapProgressBar now={progress} label={`${progress}%`} />
  );
};

export default ProgressBar;

import React, { useState } from 'react';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Summary from './Steps/Summary';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    creditCardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);  // State to track submission status

  // Proceed to the next step
  const nextStep = () => setStep(step + 1);

  // Go back to the previous step
  const prevStep = () => setStep(step - 1);

  // Handle form data change
  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  // Handle form submission
  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
    setIsSubmitted(true);
  };
  

  // If form is submitted, show success message
  if (isSubmitted) {
    return (
      <div>
        <h2>Registration Successful!</h2>
        <p>Thank you for registering. Your information has been saved.</p>
      </div>
    );
  }

  // Show the steps based on current step
  switch (step) {
    case 1:
      return <Step1 prevStep={prevStep} nextStep={nextStep} handleChange={handleChange} formData={formData} />;
    case 2:
      return <Step2 prevStep={prevStep} nextStep={nextStep} handleChange={handleChange} formData={formData} />;
    case 3:
      return <Step3 prevStep={prevStep} nextStep={nextStep} handleChange={handleChange} formData={formData} />;
    case 4:
      return <Summary formData={formData} handleChange={handleChange} prevStep={prevStep} submitForm={submitForm} />;
    default:
      return <div>Registration Complete!</div>;
  }
};

export default App;

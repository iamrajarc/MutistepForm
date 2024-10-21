import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import './Step1.css'
const Step1 = ({ nextStep, handleChange, formData,prevStep }) => {
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Next button click
  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      nextStep();
    }
  };
  const handlePrev=(e)=>{
    e.preventDefault();
    if(validate()){
      prevStep()
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("https://example.com/netflix-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '40px', borderRadius: '10px' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          MutiStep Form Validation
        </Typography>
        {/* <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
          Starts at ₹149. Cancel at any time.
        </Typography> */}

        {/* <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginTop: '20px' }}>
          Ready to watch? Enter your details to sign up.
        </Typography> */}

        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange('firstName')}
          value={formData.firstName}
          error={!!errors.firstName}
          helperText={errors.firstName}
          sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange('lastName')}
          value={formData.lastName}
          error={!!errors.lastName}
          helperText={errors.lastName}
          sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange('email')}
          value={formData.email}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
        />

        <TextField
          label="Phone (Optional)"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange('phone')}
          value={formData.phone}
          error={!!errors.phone}
          helperText={errors.phone}
          sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
         
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrev}
            sx={{ width: '100%', backgroundColor: '#e50914', padding: '10px 0', marginRight:'7px' }}
          > Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ width: '100%', backgroundColor: '#e50914', padding: '10px 0' }}
          >
          Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Step1;

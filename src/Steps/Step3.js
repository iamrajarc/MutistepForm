import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Checkbox, FormControlLabel } from '@mui/material';
// import './Step3.css';

const Step3 = ({ prevStep, nextStep, handleChange, formData }) => {
  const [errors, setErrors] = useState({});
  const [useSameAddress, setUseSameAddress] = useState(true);

  // Validation function
  const validate = () => {
    const errors = {};

    // Credit card validation: 16 digits
    const creditCardRegex = /^\d{16}$/;
    if (!formData.creditCardNumber || !creditCardRegex.test(formData.creditCardNumber)) {
      errors.creditCardNumber = 'Credit Card Number must be 16 digits';
    }

    // Expiry date validation: future date (basic validation format MM/YY)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!formData.expiryDate || !expiryDateRegex.test(formData.expiryDate)) {
      errors.expiryDate = 'Enter a valid Expiry Date (MM/YY)';
    }

    // CVV validation: 3 or 4 digits
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!formData.cvv || !cvvRegex.test(formData.cvv)) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }

    // Billing address validation: only if not using the same address
    if (!useSameAddress && !formData.billingAddress) {
      errors.billingAddress = 'Billing Address is required if different from Shipping Address';
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

  const handlePrev = (e) => {
    e.preventDefault();
    prevStep();
  };

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
          Step 3: Payment Information
        </Typography>

        <TextField
          label="Credit Card Number"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange('creditCardNumber')}
          value={formData.creditCardNumber}
          error={!!errors.creditCardNumber}
          helperText={errors.creditCardNumber}
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            fieldset: { borderColor: 'white' },
            "& .MuiInputBase-root": { color: 'white' },
          }}
        />

        <TextField
          label="Expiry Date (MM/YY)"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange('expiryDate')}
          value={formData.expiryDate}
          error={!!errors.expiryDate}
          helperText={errors.expiryDate}
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            fieldset: { borderColor: 'white' },
            "& .MuiInputBase-root": { color: 'white' },
          }}
        />

        <TextField
          label="CVV"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange('cvv')}
          value={formData.cvv}
          error={!!errors.cvv}
          helperText={errors.cvv}
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            fieldset: { borderColor: 'white' },
            "& .MuiInputBase-root": { color: 'white' },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={useSameAddress}
              onChange={() => setUseSameAddress(!useSameAddress)}
              sx={{ color: 'white' }}
            />
          }
          label="Billing address same as shipping"
          sx={{ color: 'white', marginBottom: '10px' }}
        />

        {!useSameAddress && (
          <TextField
            label="Billing Address"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange('billingAddress')}
            value={formData.billingAddress}
            error={!!errors.billingAddress}
            helperText={errors.billingAddress}
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
              "& .MuiInputBase-root": { color: 'white' },
            }}
          />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrev}
            sx={{ width: '48%', backgroundColor: '#e50914', padding: '10px 0' }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ width: '48%', backgroundColor: '#e50914', padding: '10px 0' }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Step3;

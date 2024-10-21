import React from 'react';
import { Button, Grid, Typography, TextField } from '@mui/material';
import './Summary.css'; // Import your custom styles for consistency

const Summary = ({ formData, handleChange, prevStep, submitForm }) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    creditCardNumber,
    expiryDate,
    cvv,
    billingAddress
  } = formData;

  return (
    <div className="step-container" 
    >
      <Typography variant="h4" gutterBottom>
        Summary
      </Typography>

      <Grid container spacing={3}>
        {/* First Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={handleChange('firstName')}
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={handleChange('lastName')}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={handleChange('email')}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={handleChange('phone')}
          />
        </Grid>

        {/* Country */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            value={country}
            onChange={handleChange('country')}
          />
        </Grid>

        {/* City */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={handleChange('city')}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Payment Information
      </Typography>

      <Grid container spacing={3}>
        {/* Credit Card Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Credit Card Number"
            variant="outlined"
            fullWidth
            value={creditCardNumber}
            onChange={handleChange('creditCardNumber')}
          />
        </Grid>

        {/* Expiry Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Expiry Date"
            variant="outlined"
            fullWidth
            value={expiryDate}
            onChange={handleChange('expiryDate')}
          />
        </Grid>

        {/* CVV */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="CVV"
            variant="outlined"
            fullWidth
            value={cvv}
            onChange={handleChange('cvv')}
          />
        </Grid>

        {/* Billing Address */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Billing Address"
            variant="outlined"
            fullWidth
            value={billingAddress}
            onChange={handleChange('billingAddress')}
          />
        </Grid>
      </Grid>

      {/* Buttons */}
      <div className="buttons" style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={prevStep}
          style={{ marginRight: '10px' }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={submitForm}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Summary;

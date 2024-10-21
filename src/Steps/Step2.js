import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Container, MenuItem } from '@mui/material';
import './Step2.css';

const Step2 = ({ prevStep, nextStep, handleChange, formData }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch countries from API
  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(response => response.json())
      .then(data => {
        setCountries(data.data);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // Fetch cities based on selected country
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(country => country.country === formData.country);
      setCities(selectedCountry ? selectedCountry.cities : []);
    } else {
      setCities([]);
    }
  }, [formData.country, countries]);

  // Validation function
  const validate = () => {
    const errors = {};
    if (!formData.country) errors.country = "Country is required";
    if (!formData.city) errors.city = "City is required";
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
          Step 2: Select Country and City
        </Typography>

        <TextField
          select
          label="Country"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange('country')}
          value={formData.country}
          error={!!errors.country}
          helperText={errors.country}
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            fieldset: { borderColor: 'white' },
            "& .MuiInputBase-root": { color: 'white' },
            "& .MuiSvgIcon-root": { color: 'white' }, // Dropdown arrow color
          }}
        >
          <MenuItem value="">
            <em>Select Country</em>
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.iso2} value={country.country}>
              {country.country}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="City"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange('city')}
          value={formData.city}
          error={!!errors.city}
          helperText={errors.city}
          disabled={!formData.country} // Disable if no country is selected
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            fieldset: { borderColor: 'white' },
            "& .MuiInputBase-root": { color: 'white' },
            "& .MuiSvgIcon-root": { color: 'white' }, // Dropdown arrow color
          }}
        >
          <MenuItem value="">
            <em>Select City</em>
          </MenuItem>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>

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

export default Step2;

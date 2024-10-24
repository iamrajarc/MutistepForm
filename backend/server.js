// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Schema } = mongoose;

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI (replace with your actual MongoDB URI)
const dbURI = 'mongodb://localhost:27017/MForm';

// MongoDB connection
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define the schema for the form data
const formSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  country: String,
  city: String,
  creditCardNumber: String,
  expiryDate: String,
  cvv: String,
  billingAddress: String,
});

// Create the model from the schema
const FormData = mongoose.model('FormData', formSchema);

// Route to handle form submission
app.post('/api/submit-form', async (req, res) => {
  const formData = req.body;

  try {
    // Save the data to MongoDB
    const newForm = new FormData(formData);
    console.log('form has been submitted by raja')
    await newForm.save();

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving form data' });
  }
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

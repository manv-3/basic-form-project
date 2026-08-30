const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS so the frontend can communicate with the backend
app.use(cors());
app.use(express.json());

// A simple in-memory array to store submissions
const submissions = [];

// GET endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

// POST endpoint to receive form data
app.post('/api/submit', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const newSubmission = { name, email, message, date: new Date() };
  submissions.push(newSubmission);
  
  console.log('New submission received:', newSubmission);
  
  res.status(201).json({ success: true, message: 'Form submitted successfully!' });
});

// GET endpoint to view submissions (just for demonstration)
app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

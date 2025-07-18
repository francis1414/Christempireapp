const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Christ Empire Backend is Running');
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Admin login
  if (email === 'admin@church.com' && password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET);
    return res.json({ token });
  }

  // Member login
  if (email === 'member@church.com' && password === 'member123') {
    const token = jwt.sign({ role: 'member' }, process.env.JWT_SECRET);
    return res.json({ token });
  }

  // Invalid
  return res.status(401).json({ message: 'Invalid credentials' });
});


app.post('/api/create-room', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(403).json({ message: 'No token' });

  try {
    const response = await axios.post('https://api.daily.co/v1/rooms', {
      properties: { enable_chat: true }
    }, {
      headers: { Authorization: 'Bearer ' + process.env.DAILY_API_KEY }
    });

    res.json({ url: response.data.url });
  } catch (err) {
    res.status(500).json({ message: 'Room creation failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


const User = require('./models/User');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Login failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

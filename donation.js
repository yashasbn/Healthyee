const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public')); // Serve static files from 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/donations_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Donation = mongoose.model('Donation', {
  name: String,
  gender: String,
  address: String,
  email: String,
  pincode: Number,
  cardtype: String,
  cardnumber: Number,
  expiry: String,
  cvv: String,
});

app.post('/submit', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ message: 'Donation submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

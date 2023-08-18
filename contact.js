const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/contact_form_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ContactMessage = mongoose.model('ContactMessage', {
  name: String,
  email: String,
  message: String,
});

app.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contactMessage = new ContactMessage({ name, email, message });
    await contactMessage.save();
    res.status(201).json({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

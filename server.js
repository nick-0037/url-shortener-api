require('dotenv').config();

const express = require('express');
const { nanoid } = require('nanoid');
const { connectDB } = require('./mongo');
const cors = require('cors');

const URL = require('./models/Url');

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.post('/shorten', async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL. Please provide a valid URL string.'})
  }

  try {
    const shortId = nanoid(6);
    const newUrl = await URL.create({ shortCode: shortId, url });

    res.status(201).json({
      id: newUrl._id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

app.get('/shorten/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  
  try {
    const url = await URL.findOne({ shortCode });
    
    if (!url) return res.status(404).json({ message: 'Short URL not found.' });

    url.accessCount += 1;

    await url.save();

    res.status(200).json({
      id: url._id,
      url: url.url,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


app.put('/shorten/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL. Please provide a valid URL string.'})
  }

  try {
    const urlEntry = await URL.findOne({ shortCode });
    
    if (!url) return res.status(404).json({ message: 'Short URL not found.'});

    urlEntry.url = url;
    urlEntry.updateAt = new Date();

    await urlEntry.save();

    res.status(200).json({ 
      id: urlEntry._id,
      url: urlEntry.url,
      shortCode: urlEntry.shortCode,
      createdAt: urlEntry.createdAt.toISOString(),
      updatedAt: urlEntry.updatedAt.toISOString()
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error.'})
  }
})

app.delete('/shorten/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  
  try {
    const url = await URL.findOneAndDelete({ shortCode });
    if (!url) return res.status(404).json({ message: 'Short URL not found.'});

    res.status(204).json({ message: 'Short URL deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error.'})
  }
})

app.get('/shorten/:shortCode/stats', async (req, res) => {
  const { shortCode } = req.params;
  
  try {
    const url = await URL.findOne({ shortCode });
    if(!url) return res.status(404).json({ message: 'Short URL not found.' });

    res.status(200).json({
      id: url._id,
      url: url.url,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      accessCount: url.accessCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error.' })
  }
});

const PORT = 3000;


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app
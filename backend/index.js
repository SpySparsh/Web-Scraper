const express = require('express');
const cors = require('cors');
const scrapeGoogle = require('./scraper'); // Importing from scraper.js

const app = express();

// Middleware
app.use(cors()); // Allows frontend to talk to backend
app.use(express.json()); // Parses JSON bodies

// POST route for search
app.post('/api/search', async (req, res) => {
  try {
    const query = req.body.query;
    
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    console.log(`Received search for: "${query}"`);
    
    // Call the scraper function
    const results = await scrapeGoogle(query);
    
    console.log(`Found ${results.length} results.`);
    
    res.json(results);
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to scrape Google search results' });
  }
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
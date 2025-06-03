const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = 'data.json';

// Ensure the data file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

// Load existing data from file with error handling in case the file is corrupted
let items;
try {
  items = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
} catch (err) {
  // If parsing fails, log the error and reset the file
  console.error('Failed to parse data file, resetting to empty array:', err);
  items = [];
  fs.writeFileSync(DATA_FILE, '[]');
}

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Cloth App Server!');
});

// API route to add an item
app.post('/api/add-item', (req, res) => {
  const { type, color, tag } = req.body;

  if (!type || !color || !tag) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newItem = { type, color, tag, id: Date.now() };
  items.push(newItem);

  // Save updated data to file
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));

  console.log('Item added successfully:', newItem);
  res.status(201).json({ message: 'Item added successfully', item: newItem });
});

// API route to get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

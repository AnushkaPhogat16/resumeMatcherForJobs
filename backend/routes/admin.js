const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// List all databases
router.get('/databases', async (req, res) => {
  try {
    const admin = mongoose.connection.db.admin();
    const { databases } = await admin.listDatabases();
    res.json(databases.map(db => db.name));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list databases.' });
  }
});

// List all collections
router.get('/collections', async (req, res) => {
  try {
    const cols = await mongoose.connection.db.listCollections().toArray();
    res.json(cols.map(c => c.name));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list collections.' });
  }
});

// Drop a collection
router.delete('/collections/:name', async (req, res) => {
  try {
    await mongoose.connection.db.dropCollection(req.params.name);
    res.json({ message: 'Collection dropped.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to drop collection.' });
  }
});

module.exports = router;

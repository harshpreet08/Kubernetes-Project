const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const app1 = express();
const port1 = 6000;

app1.use(express.json());

const PV_DIR = '/harshpreet_PV_dir';

app1.post('/store-file', async (req, res) => {
  try {
    const { file, data } = req.body;

    // Validate the input here
    if (!file) {
      return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
    }

    // Store the file data to the persistent volume
    const filePath = path.join(PV_DIR, file);
    await fs.writeFile(filePath, data);

    res.json({ file, message: 'Success.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ file: req.body.file, error: 'Error while storing the file to the storage.' });
  }
});

app1.post('/calculate', async (req, res) => {
  try {
    const { file, product } = req.body;

    if (!file) {
      return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
    }

    const filePath = path.join(PV_DIR, file);
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      return res.status(404).json({ file, error: 'File not found.' });
    }


    // Sendind document to app2
    const result = await axios.post(`http://10.25.74.190:6002/compute-sum`, {
      file,
      product,
    });
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error in app1.' });
  }
});

app1.listen(port1, () => {
  console.log(`App 1 is active on port ${port1}`);
});
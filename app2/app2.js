const express = require('express');
const port2 = process.env.PORT || 6002;
const path = require('path');
const csvParser = require('csv-parser');
const app2 = express();
const fs = require('fs');
app2.use(express.static('.'));
app2.use(express.json());

const PV_DIR = '/harshpreet_PV_dir';

app2.post('/compute-sum', (req, res) => {
  try {
    const { file, product } = req.body;
    const documentAddress = path.join(PV_DIR, file);
    const rows = [];

    if (!isCSVFileValid(documentAddress)) {
      return res.json({ file, error: 'Input file not in CSV format.' });
    }

    // Loading the document here
    fs.createReadStream(documentAddress)
      .pipe(csvParser())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', () => {
        const sum = rows
          .filter((row) => row.product === product)
          .reduce((acc, row) => acc + parseInt(row.amount), 0);
        res.json({ file, sum });
      });
  } catch (dikkat) {
    console.error(dikkat);
    res.status(500).json({ error: 'Internal server error in app2.' });
  }
});

function isCSVFileValid(documentAddress) {
  const content = fs.readFileSync(documentAddress, 'utf8');
  const lines = content.split('\n');
  const khaaliSeedh = lines.filter(line => line.trim() !== '');
  if (khaaliSeedh.some(line => !line.includes(','))) {
    return false;
  }

  const pehleShabd = lines[0].split(',');
  if (pehleShabd.length !== 2 || pehleShabd.some(shabd => shabd.trim() === '')) {
    return false;
  }

  for (let i = 1; i < khaaliSeedh.length; i++) {
    const seedhMeinShabd = khaaliSeedh[i].split(',');
    if (
      seedhMeinShabd.length !== 2 ||
      !/^\w+$/.test(seedhMeinShabd[0].trim()) ||
      isNaN(seedhMeinShabd[1].trim())
    ) {
      return false;
    }
  }
  return true;
}

app2.listen(port2, () => {
  console.log(`App 2 is active on port ${port2}`);
});


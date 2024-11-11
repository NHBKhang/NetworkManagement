const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.get('/speed', (req, res) => {
  exec('fast --upload --json', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing fast-cli: ${error}`);
      return res.status(500).json({ error: 'Failed to retrieve speed test data' });
    }

    try {
      const data = JSON.parse(stdout);
      res.json({
        downloadSpeed: data.downloadSpeed, // in Mbps
        uploadSpeed: data.uploadSpeed,     // in Mbps
        ping: data.latency                 // in ms
      });
    } catch (parseError) {
      console.error(`JSON parse error: ${parseError}`);
      res.status(500).json({ error: 'Failed to parse speed test data' });
    }
  });
});

module.exports = router;

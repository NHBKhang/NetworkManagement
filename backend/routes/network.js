const express = require('express');
const { exec } = require('child_process');
const router = express.Router();
const { scanNetworks, connectToWifi } = require('../controllers/networkController');

let cachedData = null;
let cacheTimestamp = null;
const cacheDuration = 5 * 60 * 1000; // Cache for 5 minutes (in milliseconds)

router.get('/scan', scanNetworks);

router.post('/connect', connectToWifi);

router.get('/speed', (req, res) => {
  const currentTime = Date.now();

  // Serve cached data if valid
  if (cachedData && cacheTimestamp && currentTime - cacheTimestamp < cacheDuration) {
    return res.status(200).json({
      ...cachedData,
      source: 'cache',
    });
  }

  // Execute the speed test if no valid cache
  exec('fast -upload --json', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing fast-cli: ${error}`);
      return res.status(500).json({ error: 'Failed to retrieve speed test data' });
    }

    try {
      const data = JSON.parse(stdout);
      cachedData = {
        downloadSpeed: data.downloadSpeed, // in Mbps
        uploadSpeed: data.uploadSpeed,     // in Mbps
        ping: data.latency                 // in ms
      };
      cacheTimestamp = currentTime;

      res.status(200).json({
        ...cachedData,
        source: 'live',
      });
    } catch (parseError) {
      console.error(`JSON parse error: ${parseError}`);
      res.status(500).json({ error: 'Failed to parse speed test data' });
    }
  });
});

module.exports = router;

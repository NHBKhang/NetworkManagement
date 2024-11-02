// network.js
const express = require('express');
const https = require('https');

const router = express.Router();

// URL of a large file for testing speed (you can replace this with any large file URL)
const testFileUrl = 'https://speed.hetzner.de/100MB.bin'; // 100MB test file

router.get('/stats', (req, res) => {
    const startTime = Date.now();
    let downloadedBytes = 0;

    https.get(testFileUrl, (response) => {
        response.on('data', (chunk) => {
            downloadedBytes += chunk.length; // accumulate downloaded bytes
        });

        response.on('end', () => {
            const endTime = Date.now();
            const durationInSeconds = (endTime - startTime) / 1000;
            const speedInMbps = (downloadedBytes * 8) / (1024 * 1024) / durationInSeconds; // Convert bytes to Mbps

            res.json({
                download: speedInMbps.toFixed(2) + ' Mbps',
                size: (downloadedBytes / (1024 * 1024)).toFixed(2) + ' MB',
                time: durationInSeconds.toFixed(2) + ' seconds'
            });
        });

        response.on('error', (error) => {
            res.status(500).json({ error: 'Error fetching speed test results: ' + error.message });
        });
    }).on('error', (error) => {
        res.status(500).json({ error: 'Error with request: ' + error.message });
    });
});

module.exports = router;

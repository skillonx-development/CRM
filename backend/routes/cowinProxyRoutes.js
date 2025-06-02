// backend/routes/cowinProxyRoutes.js
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

//test route
router.get('/test', (req, res) => {
  res.json({ message: 'Cowin route works!' });
});

// Proxy route for districts
router.get('/districts/:stateId', async (req, res) => {
    const { stateId } = req.params;
    try {
        const response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`, {
            headers: {
                'accept': 'application/json',
                'accept-language': 'en-US,en;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'referer': 'https://www.cowin.gov.in/',
                'origin': 'https://www.cowin.gov.in',
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch districts',err });
    }
});

// Add a catch-all route to help debug invalid route errors
router.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

export default router;

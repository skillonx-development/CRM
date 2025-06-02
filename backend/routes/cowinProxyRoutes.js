// backend/routes/cowinProxyRoutes.js
import express from 'express';
import { indianStates } from '../data/indianStates.js';
import { stateDistrictMap } from '../data/indianDistricts.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Cowin route works!' });
});

// Route to get all states
router.get('/states', (req, res) => {
  try {
    // Format the response to match CoWIN API structure
    const response = {
      states: indianStates,
      ttl: 24,
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching states:', err);
    res.status(500).json({
      error: 'Failed to fetch states',
      details: err.message,
    });
  }
});

// Route to get districts by state ID
router.get('/districts/:stateId', (req, res) => {
  const { stateId } = req.params;

  // Validate stateId: check existence in indianStates
  if (!stateId || !indianStates.some((state) => state.state_id === stateId)) {
    return res.status(400).json({ error: 'Invalid or missing state ID' });
  }

  try {
    const stateData = stateDistrictMap[stateId];

    if (!stateData || !stateData.districts) {
      return res.status(404).json({
        error: 'Districts not found for this state',
        stateId,
      });
    }

    const response = {
      districts: stateData.districts,
      ttl: 24,
    };

    res.json(response);
  } catch (err) {
    console.error('Error fetching districts:', err);
    res.status(500).json({
      error: 'Failed to fetch districts',
      details: err.message,
    });
  }
});

// Route to get a specific state by ID
router.get('/state/:stateId', (req, res) => {
  const { stateId } = req.params;

  if (!stateId || !indianStates.some((state) => state.state_id === stateId)) {
    return res.status(400).json({ error: 'Invalid or missing state ID' });
  }

  try {
    const state = indianStates.find((state) => state.state_id === stateId);

    res.json({ state });
  } catch (err) {
    console.error('Error fetching state:', err);
    res.status(500).json({
      error: 'Failed to fetch state',
      details: err.message,
    });
  }
});

// Route to get state with its districts
router.get('/state/:stateId/with-districts', (req, res) => {
  const { stateId } = req.params;

  if (!stateId || !indianStates.some((state) => state.state_id === stateId)) {
    return res.status(400).json({ error: 'Invalid or missing state ID' });
  }

  try {
    const state = indianStates.find((state) => state.state_id === stateId);

    const stateData = stateDistrictMap[stateId];
    const districts = stateData ? stateData.districts : [];

    res.json({
      state,
      districts,
      totalDistricts: districts.length,
    });
  } catch (err) {
    console.error('Error fetching state with districts:', err);
    res.status(500).json({
      error: 'Failed to fetch state with districts',
      details: err.message,
    });
  }
});

// Catch-all for unmatched routes under /api/cowin
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

export default router;

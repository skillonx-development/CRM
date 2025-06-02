import express from 'express';
import { indianStates } from '../data/indianStates.js';
import { stateDistrictMap } from '../data/indianDistricts.js';

const router = express.Router();

// Route to get all states
router.get('/states', (req, res) => {
    try {
        res.json({ states: indianStates });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch states', details: err.message });
    }
});

// Route to get districts by state ID
router.get('/districts/:stateId', (req, res) => {
    const { stateId } = req.params;
    if (!stateId || !indianStates.some((state) => state.state_id === stateId)) {
        return res.status(400).json({ error: 'Invalid or missing state ID' });
    }
    try {
        const stateData = stateDistrictMap[stateId];
        if (!stateData || !stateData.districts) {
            return res.status(404).json({ error: 'Districts not found for this state', stateId });
        }
        res.json({ districts: stateData.districts });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch districts', details: err.message });
    }
});

export default router;

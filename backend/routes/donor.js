import express from 'express';
const router = express.Router();

import {
    addDonor
} from '../controllers/donor.js'

/* Routes */
router.post('/addDonor',addDonor);

export default router;
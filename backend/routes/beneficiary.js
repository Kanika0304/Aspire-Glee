import express from 'express';
const router = express.Router();

import {
    addBeneficiary
} from '../controllers/beneficiary.js'

/* Routes */
router.post('/addBeneficiary',addBeneficiary);

export default router;
import express from 'express';
const router = express.Router();

import {
    addData
} from '../controllers/volunteerControllers.js'


/* Routes */
router.post('/addData',addData);

export default router;
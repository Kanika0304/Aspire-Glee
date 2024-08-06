import express from 'express';
const router = express.Router();

import {
    addStudent
    ,retrieveSchoolData
} from '../controllers/schoolControllers.js'

import {auth} from "../middlewares/auth.js"

/* Routes */
router.post('/addStudent', auth,addStudent);
router.post('/retrieveSchoolData', auth,retrieveSchoolData);

export default router;
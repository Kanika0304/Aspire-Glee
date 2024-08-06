import express from 'express';
const router = express.Router();

import {
    scholarStudent,
    getStudentsDonatedByParent
} from '../controllers/eduParentControllers.js'

import {auth} from "../middlewares/auth.js"

/* Routes */
router.post('/scholarStudent', auth,scholarStudent);
router.post('/getStudentsDonatedByParent', auth,getStudentsDonatedByParent);

export default router;
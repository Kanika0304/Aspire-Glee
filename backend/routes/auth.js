import express from 'express';
const router = express.Router();

// Import controllers
import {
    sendOTP,
    signUp,
    login
} from '../controllers/SchoolAuth.js';

import {
    sendOTP1,
    signUp1,
    login1
} from '../controllers/eduParentAuth.js'

import {
    sendOTP2,
    signUp2,
    login2
} from '../controllers/VolunteerAuth.js'

/* Routes */
router.post('/school/sendOTP', sendOTP);
router.post('/school/signUp', signUp);
router.post('/school/login', login);
// /* Routes */
router.post('/eduParent/sendOTP', sendOTP1);
router.post('/eduParent/signUp', signUp1);
router.post('/eduParent/login', login1);

router.post('/volunteer/sendOTP', sendOTP2);
router.post('/volunteer/signUp', signUp2);
router.post('/volunteer/login', login2);


export default router;
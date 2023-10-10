import express from 'express';
import { getAllUsers, register, login, getMyProfile, logout } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', getAllUsers);

router.post('/new', register);
router.post('/login', login);
router.post('/logout', logout);

// router.route("userid/:id").get(getMyProfile) // no need this further
router.get("/me", isAuthenticated, getMyProfile)

// or lengthy method
// router.get("/userid/:myID", getUserDetails)
// router.put("/userid/:myID", updateUser)

export default router;

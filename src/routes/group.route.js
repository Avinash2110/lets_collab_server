import express from 'express';
import { createGroup, deleteMyGroup, loadMyGroups } from '../controllers/group.controller.js';
import { isSignedIn } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/create", isSignedIn, createGroup);
router.get("/load", isSignedIn, loadMyGroups)
router.delete("/delete/:id", isSignedIn, deleteMyGroup );

export default router;
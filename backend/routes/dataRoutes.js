import express from 'express';
import { getData,getDataById,createData,updateData,deleteData } from '../controllers/dataController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getData).post(protect, admin, createData);

router.route('/:id').get(getDataById).put(protect, admin, updateData).delete(protect, admin, deleteData);

export default router;
import express from 'express';
import { getData,getDataById } from '../controllers/dataController.js';

const router = express.Router();

router.route('/').get(getData);

router.route('/:id').get(getDataById);

export default router;
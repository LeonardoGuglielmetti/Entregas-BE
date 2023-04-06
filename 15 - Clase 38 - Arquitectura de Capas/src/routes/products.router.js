
import { Router } from 'express';
import productsController from '../controllers/products.controller.js';
import uploader from '../services/upload.js'

const router = Router();

router.post('/home', uploader.single('image'), productsController.productsSave);

export default router;

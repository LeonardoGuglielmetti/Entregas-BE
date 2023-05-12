import cartsController from '../controllers/cart.controller.js';
import { Router } from 'express';
import { executePolicies } from '../middleware/auth.js';

const router = Router()

router.get('/product/:vid', /*executePolicies(['USER']),*/ cartsController.insertProductToCart)
router.post('/purchase', /*executePolicies(['USER']),*/ cartsController.purchase)

export default router;
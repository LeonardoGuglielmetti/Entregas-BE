
import { Router } from "express";
import { executePolicies } from "../middleware/auth.js";
import viewsController from "../controllers/views.controller.js";

const router = Router();

// ------------------------------------------------

router.get('/home', /*executePolicies(["USER", "ADMIN"]),*/ viewsController.productsGetAll);
router.get('/productcreator', viewsController.createProduct);
router.get('/cart', /*executePolicies(["USER", "ADMIN"]),*/ viewsController.cart);

// ------------------------------------------------

router.get('/', viewsController.login);

router.get('/register', viewsController.register );

router.get('/profile', executePolicies(["AUTHENTICATED"]), viewsController.profile);

// router.get('/home', viewsController.home);

router.get('/logout', viewsController.logOut);

router.get('/info', viewsController.info);

export default router;
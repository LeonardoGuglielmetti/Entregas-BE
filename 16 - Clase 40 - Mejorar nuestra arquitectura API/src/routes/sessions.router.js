import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";
import uploader from "../services/upload.js";

const router = Router();

router.post('/register', uploader.single('avatar'), sessionsController.register);

router.post('/login', passport.authenticate('login', { failureRedirect: '/sessions/loginFail', failureMessage: true }), sessionsController.login);

router.get('/loginFail', sessionsController.loginFail);

router.get('/github', passport.authenticate('github'), (req, res) => { })

router.get('/githubcallback', passport.authenticate('github'), sessionsController.gitHubCallback)

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }), async (req, res) => { });

router.get('/googlecallback', passport.authenticate('google'), sessionsController.googleCallback)

router.post('/logintoken', sessionsController.logintoken);

router.get('/current', sessionsController.current);

export default router;



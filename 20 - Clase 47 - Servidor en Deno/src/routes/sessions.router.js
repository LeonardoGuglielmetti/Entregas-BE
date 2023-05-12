import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";
import uploader from "../services/upload.js";

const router = Router();

router.post('/register', uploader.single('avatar'), sessionsController.register);

// router.post('/login', passport.authenticate('login', { failureRedirect: '/sessions/loginFail', failureMessage: true }), sessionsController.login);
router.post('/login', passport.authenticate('login', { failureRedirect: '/sessions/loginFail', session: false }), sessionsController.login)

router.get('/loginFail', sessionsController.loginFail);

router.get('/github', passport.authenticate('github'), (req, res) => { })
router.get('/githubcallback', passport.authenticate('github', { session: false }), sessionsController.gitHubCallback);

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }), async (req, res) => { });
router.get('/googlecallback', passport.authenticate('google', { session: false }), sessionsController.googleCallback);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebookcallback', passport.authenticate('facebook', { session: false }), sessionsController.facebookCallBack);

router.post('/logintoken', sessionsController.logintoken);

router.get('/current', sessionsController.current);

export default router;



import passport from 'passport';
import local from 'passport-local';
import { usersService } from '../dao/index.js'
import { validatePassword } from '../services/auth.js';
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oidc';
import config from './config.js';
import mailing from '../services/mailing.js';
import FacebookStrategy from 'passport-facebook';

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        if (email === config.superAdmin.SUPER_ADMIN_EMAIL && passport === config.superAdmin.SUPER_ADMIN_PWD)
            return done(null, { _id: 0, first_name: "Admin", role: "admin" })
        if (!email || !password) return done(null, false, { message: "Valores incompletos" })
        const user = await usersService.getBy({ email });
        if (!user) return done(null, false, { message: "Credenciales inválidas" })
        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) return done(null, false, { message: "Contraseña inválida" })
        return done(null, user)
    }))

    // Inicio de sesion por registro
    passport.use("register", new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await usersService.getBy({ email });
            if (user) {
                console.log("User already exists");
                return done(null, false);
            }
            const { name, avatar } = req.body;
            const newUser = {
                email,
                password: password,
                first_name: name,
                avatar,
            };
            const result = await usersService.save(newUser);
            console.log(`${email} Registration succesful with ID ${result.id}`);
            mailing.sendEmail(config.email.ADMIN_EMAIL, "Nuevo Registro", mailing.registerTable(newUser));
        } catch (error) {
            console.log(`Error de registro, ${error}`);
        }
    }));

    // Inicio de sesion con Git-Hub
    passport.use('github', new GitHubStrategy({
        clientID: config.github.GITHUB_USER,
        clientSecret: config.github.GITHUB_PWD,
        callbackURL: "http://localhost:8080/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const { name, email } = profile._json;
            const user = await usersService.getBy({ email });
            if (!user) {
                const newUser = {
                    first_name: name,
                    email,
                    password: '',
                }
                const result = await usersService.save(newUser);
                return done(null, result);
            }
            done(null, user);
        } catch (error) {
            done(error);
        }
    }));

    // Inicio de sesion con Google
    passport.use('google', new GoogleStrategy({
        clientID: config.google.GOOGLE_USER,
        clientSecret: config.google.GOOGLE_PWD,
        callbackURL: 'http://localhost:8080/sessions/googlecallback',
    }, async (issuer, profile, done) => {
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const email = profile.emails[0].value;
        const user = await usersService.getBy({ email });
        if (!user) {
            const newUser = {
                first_name: firstName,
                last_name: lastName,
                email,
                password: '',
            }
            let result = await usersService.save(newUser);
            return done(null, result);
        }
        else {
            return done(null, user)
        }
    }));

    // Inicio de sesion con Facebook
    passport.use('facebook', new FacebookStrategy({
        clientID: config.facebook.FACEBOOK_USER,
        clientSecret: config.facebook.FACEBOOK_PWD,
        callbackURL: 'http://localhost:8080/sessions/facebookcallback',
    }, async (accessToken, refreshToken, profile, done) => {
        const id = profile.id
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const email = profile.email;
        const user = await usersService.getBy({ email });
        if (!user) {
            const newUser = {
                id,
                first_name: firstName,
                last_name: lastName,
                email,
                password: '',
            }
            let result = await usersService.save(newUser);
            done(null, result);
        }
        else {
            return done(null, user)
        }
    }));


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const result = await usersService.getBy({ _id: id })
        done(null, result);
    })
};

export default initializeStrategies;
import { Router } from "express";
import passport from "passport";



const router = Router();


router.get("/github", passport.authenticate('github', { scope: ['user:email'] }))
router.get("/github/callback",
    passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }),
    function (req, res) {
        res.redirect('http://localhost:3000/login');
    })

router.get("/check", (req, res) => {
    if (req.isAuthenticated()) {
        res.send({ user: req.user })
    } else {
        res.send({ user: null })
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.json({ message: "Logged out" })
    })
})

export default router; 
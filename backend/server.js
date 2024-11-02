import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors"
import connectToDb from "./db/connectToDb.js";
import "./passport/github.passport.js"
import passport from "passport";
import session from "express-session";


dotenv.config();



const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
        origin: "https://github-2-frontend.netlify.app",
        credentials: true
    }
));


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(port, () => {
    console.log("Server is running on port", port)
    connectToDb();
});
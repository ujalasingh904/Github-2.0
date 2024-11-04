import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import connectToDb from "./db/connectToDb.js";
import "./passport/github.passport.js";
import passport from "passport";
import session from "express-session";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS to allow requests only from your frontend URL and enable credentials
app.use(
  cors({
    origin: "https://github-2-0-indol.vercel.app", // specify your frontend URL
    credentials: true,
  })
);

// Session setup with a secure secret
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat', 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // secure cookies in production
      httpOnly: true,
      sameSite: "lax", // adjust based on your setup
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(port, () => {
  console.log("Server is running on port", port);
  connectToDb();
});

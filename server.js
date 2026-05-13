import dotenv from "dotenv";
dotenv.config();


import express from "express";
import expressLayouts from "express-ejs-layouts";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import scoreRouter from "./routes/scoreRoute.js"
import session from "express-session";
import mongoose from "mongoose";


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session?.user || null;
  next();
});

app.use(express.static("public")); // ✅ ADD THIS

app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layout");

app.get("/", (req, res) => {
  res.render("home");
});

console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


/* mongoose
   .connect("mongodb://127.0.0.1:27017/quizapp")
   .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));*/

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/score",scoreRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
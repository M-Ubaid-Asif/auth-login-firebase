const express = require("express");

const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");
const app = express();
const expressLayout = require("express-ejs-layouts");
const router = require("./routes");
const config = require("./config/config");
const logger = require("./config/logger");
const serviceAccount = require("./serviceAccountKey.json");

const port = process.argv[2] || process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(expressLayout);

// initalize firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use("/", router);

app.use((req, res) => {
  res.status(404).json({
    status: "failed",
    message: "Not found",
  });
});

app.listen(config.server.port, () => {
  logger.info(`server is running on ${port}`);
});

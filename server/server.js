const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const signupLoginAuth = require("./signupLoginAuth");
const MongoDBStore = require("connect-mongodb-session")(session);
const game = require("./game");


require('dotenv').config();

//___________________________database connect____________

const uri = process.env.URI;
const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

//___________________________middleware start____________

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "thehighpriestess",
    resave: true,
    saveUninitialized: true,
    store: store,
  })
);
app.use(cookieParser("thehighpriestess"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/", signupLoginAuth);
app.use("/", game(io));


//________________________middleware end___________________

app.listen(3001, () => {
  console.log("server started on port 3001");
});

server.listen(3002, () => {
  console.log("Socket.io is running on port 3002");
});

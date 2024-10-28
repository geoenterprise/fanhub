require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "https://fanhubapp.netlify.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
    res.json(users)
});
const posts = [
    {
        email: "Geo@gmail.com",
        title: "Post 1"
    },
    {
        email: "Jovannyrey1@gmail.com",
        title: "Post 2"
    }
];
app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.email === req.user.email));
    }
);

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// app.get("/login", (req, res) => {

// })

app.listen(3000)

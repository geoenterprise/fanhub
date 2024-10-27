require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'https://fanhubapp.netlify.app/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ email: user.email })
    res.json({ accessToken: accessToken })
  })
})

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post("/login", async (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    if (user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign({email: user.email}, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken)
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.status(403).send("Not Allowed");
        }
    } catch {
        res.status(500).send();
    }
    
});

function generateAccessToken(user) {
    return jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
};

// app.get("/login", (req, res) => {

// })

app.listen(4000)

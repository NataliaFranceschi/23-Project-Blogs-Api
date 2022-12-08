const express = require('express');
const router = require('./routers');

const app = express();

app.use(express.json());

app.use('/user', router.userRouter);
app.use('/login', router.loginRouter);
app.use('/categories', router.categoryRouter);
app.use('/post', router.postRouter);

module.exports = app;

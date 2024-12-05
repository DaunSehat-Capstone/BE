const user_route = require('./route/user_route');
const uarticle_route = require('./route/uarticle_route');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
app.use('/user', user_route);
app.use('/uarticle', uarticle_route);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });


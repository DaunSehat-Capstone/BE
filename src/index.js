const user_route = require('./route/user_route');
const uarticle_route = require('./route/uarticle_route');
const garticle_route = require('./route/garticle_route');
const predict_route = require('./route/predict_route');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API untuk manajemen pengguna, termasuk registrasi, login, dan pengelolaan profil.',
        },
        servers: [
            {
                url: 'http://34.101.125.166/',
                // url: 'http://localhost:3000/',
            },
        ],
    },
    apis: ['./src/route/*.js'], // Path ke file yang berisi anotasi
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
app.use('/user', user_route);
app.use('/uarticle', uarticle_route);
app.use('/garticle', garticle_route);
app.use('/predict', predict_route);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });


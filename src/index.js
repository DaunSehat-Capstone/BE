const db = require('./database');
const express = require('express');
const app = express();
const port = 3000;

app.get('/guidance', (req, res) => {
    const sql = 'SELECT * FROM guidance_article';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    }
    );
});

// app.post('/guidance', (req, res) => {
//     const { title_guidance, body_guidance, category_guidance, image_guidance } = req.body;
//     const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
//     const sql = `INSERT INTO guidance_article (title_guidance, body_guidance, category_guidance, image_guidance) VALUES ('${title}', '${content}')`;
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send('Guidance added to database');
//     });
// });

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });


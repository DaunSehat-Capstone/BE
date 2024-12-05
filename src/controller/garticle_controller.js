const db = require('../database');
const { getTokenInfo } = require('../middleware/jwt');
const { upload_to_gcs } = require("../models/upload_img")

async function post_article(req, res) {
    let img_url = null;
    const JWT_TOKEN = req.headers.authorization;
    const decoded = getTokenInfo(JWT_TOKEN);
    const user_id = decoded.id;
    const email = decoded.email;

    try {
        if (email !== 'admin@daunsehat.id' && user_id !== 1){
            return res.status(401).json({ error: 'Unauthorized access.' });
        }
        if (req.file){
            if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png'){
                return res.status(400).json({ error: 'File must be an image.' });
            }

            if (req.file.size > 5 * 1024 * 1024){
                return res.status(400).json({ error: 'Ukuran file tidak boleh lebih dari 5 MB.' });
            }

            if (req.file.length > 1){
                return res.status(400).json({ error: 'Hanya bisa mengunggah 1 gambar.' });
            }

            img_url = await upload_to_gcs(req.file, 'article');
        }

        const query = "INSERT INTO guidance_article (title_guidance, body_guidance, category_guidance, image_guidance) VALUES (?, ?, ?, ?)";
        const values = [req.body.title_guidance, req.body.body_guidance, req.body.category_guidance, img_url];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred while posting article.' });
            }

            const sql_select = `SELECT * FROM guidance_article ORDER BY timestamp DESC LIMIT 1`;

            db.query(sql_select, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'An error occurred while getting the user profile.' });
                }

                const article = result[0];
                res.status(200).json({ message: 'Guidance Article posted successfully.', article });
            });
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

function delete_article_by_gid(req, res) {
    const gid = req.params.gid;
    const JWT_TOKEN = req.headers.authorization;
    const decoded = getTokenInfo(JWT_TOKEN);
    const user_id = decoded.id;
    const email = decoded.email;

    if (email !== 'admin@daunsehat.id' && user_id !== 1){
        return res.status(401).json({ error: 'Unauthorized access.' });
    }

    const sql = `DELETE FROM guidance_article WHERE guidance_id = ?`;
    db.query(sql, [gid], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while deleting guidance_article.' });
        }

        res.status(200).json({ message: 'Guidance Article deleted successfully.' });
    });
}

function get_all_garticle(req, res) {
    const sql = `SELECT * FROM guidance_article ORDER BY timestamp DESC`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while retrieving guidance_article.' });
        }

        res.status(200).json(result);
    });
}

function get_article_by_category(req, res) {
    const category = req.params.category;
    const sql = `SELECT * FROM guidance_article WHERE category_guidance = ? ORDER BY timestamp DESC`;
    db.query(sql, [category], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while retrieving guidance_article.' });
        }

        res.status(200).json(result);
    });
}

module.exports = { post_article, get_all_garticle, get_article_by_category, delete_article_by_gid };
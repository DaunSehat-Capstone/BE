const db = require('../database');
const { getTokenInfo } = require('../middleware/jwt');
const { upload_to_gcs } = require("../models/upload_img")


async function post_article(req, res) {
    let img_url = null;
    try {
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
        const JWT_TOKEN = req.headers.authorization;
        const decoded = getTokenInfo(JWT_TOKEN);

        const query = "INSERT INTO user_article (user_id, title_article, body_article, image_article) VALUES (?, ?, ?, ?)";
        const values = [decoded.id, req.body.title_article, req.body.body_article, img_url];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred while posting article.' });
            }

            const sql_select = `SELECT * FROM user_article WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1`;

            db.query(sql_select, [decoded.id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'An error occurred while getting the user profile.' });
                }

                const article = result[0];
                res.status(200).json({ message: 'Article posted successfully.', article });
            });
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

function get_all_article_by_uid(req, res) {
    const decoded = getTokenInfo(req.headers.authorization);
    const sql = `SELECT u.name, u.image_url, ua.article_id, ua.user_id, ua.title_article, ua.body_article, ua.image_article, ua.timestamp FROM user_article ua LEFT JOIN users u ON ua.user_id = u.user_id WHERE ua.user_id = ? ORDER BY timestamp DESC`;
    values = [decoded.id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while retrieving user_article.' });
        }

        res.status(200).json(result);
    });
}

function get_article_by_uaid(req, res) {
    const { article_id } = req.params;
    // const decoded = getTokenInfo(req.headers.authorization);
    const sql = `SELECT u.name, u.image_url, ua.article_id, ua.user_id, ua.title_article, ua.body_article, ua.image_article, ua.timestamp FROM user_article ua LEFT JOIN users u ON ua.user_id = u.user_id WHERE article_id = ?`;
    const values = [article_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while retrieving article.' });
        }

        if (result.length === 0) {
            return res.status(400).json({ error: 'Article not found.' });
        }

        res.status(200).json(result[0]);
    });
}

function delete_article_by_uaid(req, res) {
    const { article_id } = req.params;
    const decoded = getTokenInfo(req.headers.authorization);
    const sql = `DELETE FROM user_article WHERE article_id = ? AND user_id = ?`;
    const values = [article_id, decoded.id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while deleting article.' });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Article not found.' });
        }

        res.status(200).json({ message: 'Article deleted successfully.' });
    });
}

function get_all_article(req, res) {
    const sql = `SELECT u.name, u.image_url, ua.article_id, ua.user_id, ua.title_article, ua.body_article, ua.image_article, ua.timestamp FROM user_article ua LEFT JOIN users u ON ua.user_id = u.user_id ORDER BY timestamp DESC`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while retrieving user_article.' });
        }

        res.status(200).json(result);
    });
}

function search_user_article(req, res) {
    const { query } = req.params;
    const sql = `SELECT u.name, u.image_url, ua.article_id, ua.user_id, ua.title_article, ua.body_article, ua.image_article, ua.timestamp FROM user_article ua LEFT JOIN users u ON ua.user_id = u.user_id WHERE ua.title_article LIKE ? ORDER BY timestamp DESC`;
    const values = [`%${query}%`];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while retrieving user_article.' });
        }

        res.status(200).json(result);
    });
}

module.exports = { post_article, get_all_article_by_uid, get_article_by_uaid, delete_article_by_uaid, get_all_article, search_user_article };
const db = require('../database');
const { getTokenInfo } = require('../middleware/jwt');

function get_all_article_by_uid(req, res) {
    const decoded = getTokenInfo(req.headers.authorization);
    const sql = `SELECT * FROM user_article WHERE user_id = ? ORDER BY timestamp DESC`;
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
    const decoded = getTokenInfo(req.headers.authorization);
    const sql = `SELECT * FROM user_article WHERE article_id = ? AND user_id = ?`;
    const values = [article_id, decoded.id];

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
    const sql = `SELECT * FROM user_article ORDER BY timestamp DESC`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while retrieving user_article.' });
        }

        res.status(200).json(result);
    });
}

module.exports = { get_all_article_by_uid, get_article_by_uaid, delete_article_by_uaid, get_all_article };
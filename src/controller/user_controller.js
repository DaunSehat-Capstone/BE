const db = require('../database');
const bcrypt = require('bcrypt');

function register_user(req, res) {
    const { email, hashed_password, name } = req.body;
  
    if (!email || !hashed_password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required.' });
    }
  
    const h_password = bcrypt.hashSync(hashed_password, 10);
  
    const user_id = Math.floor(Math.random() * 1000);
  
    const sql = `INSERT INTO users (user_id, email, hashed_password, name) VALUES (?, ?, ?, ?)`;
    const values = [user_id, email, h_password, name];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists.' });
        }
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while registering the user.' });
      }
  
      res.status(201).json({
        message: 'User registered successfully.',
        user: { user_id, email, name },
      });
    });
  }

function login_user(req, res){

}

module.exports = { register_user, login_user };
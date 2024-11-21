const db = require('../database');
const bcrypt = require('bcrypt');
const { generateToken, getTokenInfo } = require('../middleware/jwt');

function register_user(req, res) {
  const { email, hashed_password, name } = req.body;

  if (!email || !hashed_password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required.' });
  }

  const h_password = bcrypt.hashSync(hashed_password, 10);


  const sql = `INSERT INTO users (email, hashed_password, name) VALUES (?, ?, ?)`;
  const values = [email, h_password, name];

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
      user: { email, name },
    });
  });
}

async function login_user(req, res){
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  const values = [email];

  db.query(sql, values, async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while logging in.' });
    }

    if (result.length === 0) {
      return res.status(400).json({ error: 'Email not found.' });
    }

    const user = result[0];

    const isPasswordMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    const token = generateToken(user);
    res.status(200).json({ 
      message: 'Login successful.',
      token,
      user: { user_id: user.user_id, email: user.email, name: user.name },
     });
  });   
}

function get_user_profile(req, res) {
  const JWT_TOKEN = req.headers.authorization;
  const decoded = getTokenInfo(JWT_TOKEN);
  res.status(200).json({ 
    message: 'Success getting user profile information.',
    user: { user_id: decoded.id, email: decoded.email, name: decoded.name },
   });
}

async function put_user_profile(req, res) {
  const { email, name } = req.body;
  const JWT_TOKEN = req.headers.authorization;
  const decoded = getTokenInfo(JWT_TOKEN);

  const sql = `UPDATE users SET email = ?, name = ? WHERE user_id = ?`;
  const values = [email, name, decoded.id];

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required.' });
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while updating the user profile.' });
    }
  

  const sql_select = `SELECT * FROM users WHERE user_id = ?`;

  db.query(sql_select, [decoded.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while getting the user profile.' });
    }
    const user = result[0];
    const token = generateToken(
      { user_id: user.user_id, email: user.email, name: user.name }
    );
    res.status(200).json({ message: 'User profile updated successfully.', token, user: { user_id: user.user_id, email: user.email, name: user.name }
    });
  });
});
}

module.exports = { register_user, login_user, get_user_profile, put_user_profile };
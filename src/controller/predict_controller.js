const db = require('../database');
const { upload_to_gcs } = require("../models/upload_img")
const axios = require('axios');
const FormData = require('form-data');
const { getTokenInfo } = require("../middleware/jwt")

async function post_prediction(req, res){
    let img_url = null;
    try{
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

            img_url = await upload_to_gcs(req.file, 'history');
        }
        const predict_url = process.env.PREDICT_URL;

        const formData = new FormData();
        formData.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        const predict_res = await axios.post(predict_url, formData, {
            headers: {
                ...formData.getHeaders(),
            }
        });

        const prediction = predict_res.data;
        const JWT_TOKEN = req.headers.authorization;
        const decoded = getTokenInfo(JWT_TOKEN);

        console.log("prediction", prediction)
        const sql = "INSERT INTO prediction (user_id, plant, plant_condition, confidence, treatment, image_plant, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const values = [decoded.id, prediction.plant, prediction.condition, prediction.confidence, prediction.treatment, img_url, timestamp];

        db.query(sql, values, (err, result) => {
            if (err){
                console.error(err);
                return res.status(500).json({ error: 'An error occured while retrieving prediction'})
            }
            res.status(200).json(
                {
                    message: 'Prediction posted successfully.',
                    prediction: {
                        user_id: decoded.id,
                        plant: prediction.plant,
                        plant_condition: prediction.condition,
                        confidence: prediction.confidence,
                        treatment: prediction.treatment,
                        image_plant: img_url,
                        timestamp: timestamp
                    }
                }
            )
        })
    }
    catch (error){
        res.status(500).send(error)
    }
}

function get_user_prediction(req, res){
    const JWT_TOKEN = req.headers.authorization;
    const decoded = getTokenInfo(JWT_TOKEN);
    const sql = `SELECT * FROM prediction WHERE user_id = ? ORDER BY timestamp DESC`;
    db.query(sql, [decoded.id], (err, result) => {
        if (err){
            console.error(err);
            return res.status(500).json({ error: 'An error occured.' });
        }

        res.status(200).json(result);
    });
}

module.exports = { post_prediction, get_user_prediction }
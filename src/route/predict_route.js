predict_controller = require('../controller/predict_controller');
const predict_route = require('express').Router();
const { authentication } = require('../middleware/authentication');
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   - name: Prediction
 */

/**
 * @swagger
 * /predict:
 *   post:
 *     tags: [Prediction]
 *     summary: Post Prediction
 *     description: Endpoint untuk mengunggah data dan mendapatkan prediksi berdasarkan file yang diunggah.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - file
 *     responses:
 *       '201':
 *         description: Data berhasil diunggah dan prediksi berhasil dibuat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prediction posted successfully."
 *                 prediction:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 0
 *                     plant:
 *                       type: string
 *                       example: "Jagung"
 *                     plant_condition:
 *                       type: string
 *                       example: "Common Rust"
 *                     confidence:
 *                       type: string
 *                       example: "99.95898604393005"
 *                     treatment:
 *                       type: string
 *                       example: "Gunakan varietas tahan dan aplikasikan fungisida seperti tebukonazol jika diperlukan."
 *                     image_plant:
 *                       type: string
 *                       example: "https://storage.googleapis.com/"
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-10 11:03:54"
 */
predict_route.post('/', authentication, multer.single('file'), predict_controller.post_prediction);

/**
 * @swagger
 * /predict:
 *   get:
 *     tags: [Prediction]
 *     summary: Get User Prediction History
 *     description: Endpoint untuk mendapatkan semua prediksi yang telah dibuat oleh pengguna.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Daftar prediksi berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   prediction_id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 0
 *                   plant:
 *                     type: string
 *                     example: "Jagung"
 *                   plant_condition:
 *                     type: string
 *                     example: "Common Rust"
 *                   confidence:
 *                     type: string
 *                     example: "99.95898604393005"
 *                   treatment:
 *                     type: string
 *                     example: "Gunakan varietas tahan dan aplikasikan fungisida seperti tebukonazol jika diperlukan."
 *                   image_plant:
 *                     type: string
 *                     example: "https://storage.googleapis.com/"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-10T04:03:54.000Z"
 */
predict_route.get('/', authentication, predict_controller.get_user_prediction);

module.exports = predict_route;
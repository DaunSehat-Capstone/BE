const uarticle_controller = require('../controller/uarticle_controller');
const uarticle_route = require('express').Router();
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
 *   - name: Community Space
 */

/**
 * @swagger
 * /uarticle:
 *   post:
 *     tags: [Community Space]
 *     description: Post User Article
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title_article:
 *                 type: string
 *               body_article:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title_article
 *               - body_article:
 *     responses:
 *       '201':
 *         description: Article posted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article posted successfully.
 *                 article:
 *                   type: object
 *                   properties:
 *                     article_id:
 *                       type: integer
 *                       example: 15
 *                     user_id:
 *                       type: integer
 *                       example: 0
 *                     title_article:
 *                       type: string
 *                       example: title article
 *                     body_article:
 *                       type: string
 *                       example: body article
 *                     image_article:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-09T11:54:23.000Z"
 */
uarticle_route.post('/', authentication, multer.single('file'), uarticle_controller.post_article);

/**
 * @swagger
 * /uarticle:
 *   get:
 *     tags: [Community Space]
 *     summary: Get All User Article
 *     description: Endpoint untuk mendapatkan semua artikel.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Daftar artikel berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   article_id:
 *                     type: integer
 *                     example: 13
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   title_article:
 *                     type: string
 *                     example: "g"
 *                   body_article:
 *                     type: string
 *                     example: "g"
 *                   image_article:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-08T23:51:55.000Z"
 */
uarticle_route.get('/', authentication, uarticle_controller.get_all_article);

/**
 * @swagger
 * /uarticle/user:
 *   get:
 *     tags: [Community Space]
 *     summary: Get All User Article by User ID
 *     description: Endpoint untuk mendapatkan semua artikel oleh pengguna tertentu.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Daftar artikel pengguna berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Admin"
 *                   article_id:
 *                     type: integer
 *                     example: 15
 *                   user_id:
 *                     type: integer
 *                     example: 0
 *                   title_article:
 *                     type: string
 *                     example: "Test title with photo"
 *                   body_article:
 *                     type: string
 *                     example: "Test body with photo"
 *                   image_article:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-09T11:54:23.000Z"
 */
uarticle_route.get('/user', authentication, uarticle_controller.get_all_article_by_uid);

/**
 * @swagger
 * /uarticle/{article_id}:
 *   get:
 *     tags: [Community Space]
 *     summary: Get Article by ID
 *     description: Endpoint untuk mendapatkan artikel berdasarkan ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: article_id
 *         in: path
 *         required: true
 *         description: ID artikel yang ingin diambil.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Daftar artikel pengguna berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Admin"
 *                   article_id:
 *                     type: integer
 *                     example: 15
 *                   user_id:
 *                     type: integer
 *                     example: 0
 *                   title_article:
 *                     type: string
 *                     example: "Test title with photo"
 *                   body_article:
 *                     type: string
 *                     example: "Test body with photo"
 *                   image_article:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-09T11:54:23.000Z"
 */
uarticle_route.get('/:article_id', authentication, uarticle_controller.get_article_by_uaid);

/**
 * @swagger
 * /uarticle/search/{query}:
 *   get:
 *     tags: [Community Space]
 *     summary: Search Article by Query
 *     description: Endpoint untuk mencari artikel berdasarkan query.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: query
 *         in: path
 *         required: true
 *         description: Kata kunci untuk pencarian artikel.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Daftar artikel pengguna berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Admin"
 *                   article_id:
 *                     type: integer
 *                     example: 15
 *                   user_id:
 *                     type: integer
 *                     example: 0
 *                   title_article:
 *                     type: string
 *                     example: "Test title with photo"
 *                   body_article:
 *                     type: string
 *                     example: "Test body with photo"
 *                   image_article:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-09T11:54:23.000Z"
 */
uarticle_route.get('/search/:query', authentication, uarticle_controller.search_user_article);

/**
 * @swagger
 * /uarticle/{article_id}:
 *   delete:
 *     tags: [Community Space]
 *     summary: Delete Article by ID
 *     description: Endpoint untuk menghapus artikel berdasarkan ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: article_id
 *         in: path
 *         required: true
 *         description: ID artikel yang ingin dihapus.
 *         schema:
 *           type: integer
 *     responses:
 *       '400':
 *         description: Permintaan tidak valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Article not found."
 *       '200':
 *         description: Artikel berhasil dihapus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article deleted successfully."
 */
uarticle_route.delete('/:article_id', authentication, uarticle_controller.delete_article_by_uaid);

module.exports = uarticle_route;
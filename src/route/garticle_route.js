const garticle_controller = require('../controller/garticle_controller');
const garticle_route = require('express').Router();
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
 *   - name: Guidance Article
 */

/**
 * @swagger
 * /garticle:
 *   post:
 *     tags: [Guidance Article]
 *     summary: Post Guidance Article [Authorized Account Only]
 *     description: Endpoint untuk mengunggah artikel panduan baru dengan file.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title
 *               - content
 *     responses:
 *       '201':
 *         description: Guidance Article posted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Guidance Article posted successfully."
 *                 article:
 *                   type: object
 *                   properties:
 *                     guidance_id:
 *                       type: integer
 *                       example: 1
 *                     title_guidance:
 *                       type: string
 *                       example: "Title guidance article"
 *                     body_guidance:
 *                       type: string
 *                       example: "Body guidance article"
 *                     category_guidance:
 *                       type: string
 *                       example: "test"
 *                     image_guidance:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-09T11:56:05.000Z"
 *       '401':
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       '500':
 *         description: Terjadi kesalahan saat mengunggah artikel.
 */
garticle_route.post('/', authentication, multer.single('file'), garticle_controller.post_article);

/**
 * @swagger
 * /garticle:
 *   get:
 *     tags: [Guidance Article]
 *     summary: Get All Guidance Article
 *     description: Endpoint untuk mendapatkan semua artikel panduan.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Daftar artikel panduan berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   guidance_id:
 *                     type: integer
 *                     example: 14
 *                   title_guidance:
 *                     type: string
 *                     example: "Test title guidance article no photo"
 *                   body_guidance:
 *                     type: string
 *                     example: "Test body guidance article no photo"
 *                   category_guidance:
 *                     type: string
 *                     example: "test"
 *                   image_guidance:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-09T11:56:05.000Z"
 */
garticle_route.get('/', authentication, garticle_controller.get_all_garticle);

/**
 * @swagger
 * /garticle/{category}:
 *   get:
 *     tags: [Guidance Article]
 *     summary: Get Guidance Article by Category
 *     description: Endpoint untuk mendapatkan artikel panduan berdasarkan kategori.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         description: Kategori artikel yang ingin diambil.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Artikel panduan berdasarkan kategori berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   guidance_id:
 *                     type: integer
 *                     example: 14
 *                   title_guidance:
 *                     type: string
 *                     example: "Test title guidance article no photo"
 *                   body_guidance:
 *                     type: string
 *                     example: "Test body guidance article no photo"
 *                   category_guidance:
 *                     type: string
 *                     example: "test"
 *                   image_guidance:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-09T11:56:05.000Z"
 */
garticle_route.get('/:category', authentication, garticle_controller.get_article_by_category);

/**
 * @swagger
 * /garticle/{gid}:
 *   delete:
 *     tags: [Guidance Article]
 *     summary: Delete Guidance Article [Authorized Account Only]
 *     description: Endpoint untuk menghapus artikel panduan berdasarkan ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: gid
 *         in: path
 *         required: true
 *         description: ID artikel yang ingin dihapus.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Artikel panduan berhasil dihapus dengan pesan konfirmasi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Guidance Article deleted successfully."
 *       '401':
 *         description: Tidak terautentikasi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 */
garticle_route.delete('/:gid', authentication, garticle_controller.delete_article_by_gid);

module.exports = garticle_route;
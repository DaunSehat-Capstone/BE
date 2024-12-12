const user_controller = require("../controller/user_controller");
const user_route = require("express").Router();
const { authentication } = require("../middleware/authentication");
const Multer = require("multer");
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})

/**
 * @swagger
 * tags:
 *   - name: User
 */

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
* /user/register:
*   post:
*     tags: [User]
*     summary: User Register
*     description: Endpoint untuk mendaftar pengguna baru.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               hashed_password:
*                 type: string
*               email:
*                 type: string
*             required:
*               - name
*               - hashed_password
*               - email
*     responses:
*       '201':
*         description: User registered successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: User registered successfully.
*                 user:
*                   type: object
*                   properties:
*                     email:
*                       type: string
*                       example: tes@mail.com
*                     name:
*                       type: string
*                       example: tes
*       '400':
*         description: Email already exists.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Email already exist.
*       '500':
*         description: An error occurred while registering the user.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: An error occurred while registering the user.
*/
user_route.post("/register", user_controller.register_user);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [User]
 *     summary: User Login
 *     description: Endpoint untuk login pengguna yang sudah terdaftar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login berhasil, mengembalikan token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful.
 *                 token:
 *                   type: string
 *                   example: your_jwt_token_here
 *                 user:
 *                 properties:
 *                  user_id:
 *                   type: integer
 *                   example: 1
 *                  email:
 *                   type: string
 *                   example: tes@mail.com
 *                  name:
 *                   type: string
 *                   example: tes
 *       '400':
 *         description: Invalid password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid password.
 *       '401':
 *         description: Email not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email not found.
 */
user_route.post("/login", user_controller.login_user);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags: [User]
 *     summary: Get User Profile
 *     description: Endpoint untuk mendapatkan informasi profil pengguna yang terautentikasi.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profil pengguna berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success getting user profile information.
 *                 user:
 *                  type: object
 *                  properties:
 *                    user_id:
 *                      type: integer
 *                      example: 1
 *                    email:
 *                      type: string
 *                      example: tes@mail.com
 *                    name:
 *                      type: string
 *                      example: tes
 */
user_route.get("/profile", authentication, user_controller.get_user_profile);

/**
 * @swagger
 * /user/profile:
 *   put:
 *     tags: [User]
 *     summary: Update User Profile
 *     description: Endpoint untuk memperbarui informasi profil pengguna yang terautentikasi.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       '200':
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully.
 *                 token:
 *                   type: string
 *                   example: your_jwt_token_here
 *                 user:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: tes@mail.com
 *                     name:
 *                       type: string
 *                       example: tes
 *                     image_url:
 *                       type: string
 *                       example: https://storage.googleapis.com/
 */
user_route.put("/profile", authentication, user_controller.put_user_profile);

/**
 * @swagger
 * /user/upload_image:
 *   post:
 *     tags: [User]
 *     summary: Upload User Image
 *     description: Endpoint untuk mengunggah gambar profil pengguna yang terautentikasi.
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
 *     responses:
 *       '200':
 *         description: Gambar berhasil diunggah.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image uploaded successfully.
 *                 token:
 *                   type: string
 *                   example: your_jwt_token_here
 *                 user:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: tes@mail.com
 *                     name:
 *                       type: string
 *                       example: tes
 *                     image_url:
 *                       type: string
 *                       example: https://storage.googleapis.com/
 *       '400':
 *        description: File must be an image.
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                type: string
 *                example: Tidak ada file yang diunggah.
 */
user_route.post("/upload_image", authentication, multer.single("file"), user_controller.post_user_img);

module.exports = user_route;
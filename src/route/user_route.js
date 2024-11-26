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

user_route.post("/register", user_controller.register_user);
user_route.post("/login", user_controller.login_user);
user_route.get("/profile", authentication, user_controller.get_user_profile);
user_route.put("/profile", authentication, user_controller.put_user_profile);
user_route.post("/upload_image", authentication, multer.single("file"), user_controller.post_user_img);

module.exports = user_route;
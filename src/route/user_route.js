const user_controller = require("../controller/user_controller");
const user_route = require("express").Router();
const { authentication } = require("../middleware/authentication");

user_route.post("/register", user_controller.register_user);
user_route.post("/login", user_controller.login_user);
user_route.get("/profile", authentication, user_controller.get_user_profile);
user_route.put("/profile", authentication, user_controller.put_user_profile);

module.exports = user_route;
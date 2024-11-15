const user_controller = require("../controller/user_controller");
const user_route = require("express").Router();

user_route.post("/register", user_controller.register_user);
user_route.post("/login", user_controller.login_user);

module.exports = user_route;
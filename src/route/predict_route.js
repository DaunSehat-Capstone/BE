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

predict_route.post('/', authentication, multer.single('file'), predict_controller.post_prediction);
predict_route.get('/', authentication, predict_controller.get_user_prediction);

module.exports = predict_route;
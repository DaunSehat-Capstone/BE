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

uarticle_route.post('/', authentication, multer.single('file'), uarticle_controller.post_article);
uarticle_route.get('/', authentication, uarticle_controller.get_all_article);
uarticle_route.get('/user', authentication, uarticle_controller.get_all_article_by_uid);
uarticle_route.get('/:article_id', authentication, uarticle_controller.get_article_by_uaid);
uarticle_route.delete('/:article_id', authentication, uarticle_controller.delete_article_by_uaid);

module.exports = uarticle_route;
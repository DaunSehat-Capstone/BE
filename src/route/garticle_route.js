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

garticle_route.post('/', authentication, multer.single('file'), garticle_controller.post_article);
garticle_route.get('/', authentication, garticle_controller.get_all_garticle);
garticle_route.get('/:category', authentication, garticle_controller.get_article_by_category);
garticle_route.delete('/:gid', authentication, garticle_controller.delete_article_by_gid);

module.exports = garticle_route;
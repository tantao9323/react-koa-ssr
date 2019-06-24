const Router = require('koa-router');
const HomeControl = require('./controllers/home');
const DetailControl = require('./controllers/detail');

const router = new Router();
router.get('/api/flash', HomeControl.flash);
router.get('/api/column', HomeControl.column);
router.get('/api/detail', DetailControl.detail);

module.exports = router;

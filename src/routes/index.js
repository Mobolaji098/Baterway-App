const auth = require('./auth');
const user = require('./user');
const product = require('./product')

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API of barterway. Register or Login to test Authentication."});
    });

    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/product', authenticate, product);
};
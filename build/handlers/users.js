import { UserStore } from '../models/users.js';
import jwt from 'jsonwebtoken';
const user = new UserStore();
const index = async (req, res) => {
    const getUsers = await user.index();
    const token = jwt.sign({ User: getUsers }, process.env.TOKEN_SECRET);
    res.json(token);
};
const show = async (req, res) => {
    const showUsers = await user.show(parseInt(req.params.id));
    const token = jwt.sign({ User: showUsers }, process.env.TOKEN_SECRET);
    res.json(token);
};
const create = async (req, res) => {
    const { firstname, lastname, password } = req.body;
    try {
        if (!firstname || !lastname || !password) {
            return res.status(400).send('Missing required query parameters: firstname, lastname, and password are required.');
        }
        if (typeof firstname !== 'string' || typeof lastname !== 'string' || typeof password !== 'string') {
            return res.status(400).send('Query parameters must be strings.');
        }
        const users = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const newUser = await user.create(users);
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
};
export default userRoutes;
//# sourceMappingURL=users.js.map
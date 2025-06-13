import { UserStore } from '../models/users.js';
import bcrypt from 'bcrypt';
const pepper = process.env.BCRYPT_PASSWORD || ''; // Provide a default value
const saltRounds = process.env.SALT_ROUNDS || '10'; // Provide a default value
const user = new UserStore();
const index = async (_req, res) => {
    const users = await user.index();
    res.json(users);
};
const show = async (req, res) => {
    const users = await user.show(parseInt(req.params.id));
    res.json(users);
};
const create = async (req, res) => {
    const { firstname, lastname, password } = req.query;
    try {
        if (!firstname || !lastname || !password) {
            return res.status(400).send('Missing required query parameters: firstname, lastname, and password are required.');
        }
        if (typeof firstname !== 'string' || typeof lastname !== 'string' || typeof password !== 'string') {
            return res.status(400).send('Query parameters must be strings.');
        }
        const hash = bcrypt.hashSync(req.query.password + pepper, parseInt(saltRounds));
        const users = {
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            password: hash,
        };
        const newUser = await user.create(users);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    const id = req.params.id;
    const { firstname, lastname, password } = req.body;
    try {
        const existingUser = await user.show(parseInt(id));
        if (!existingUser) {
            return res.status(404).json({ error: `User with ID ${id} not found.` });
        }
        const userToUpdate = {
            id: existingUser.id,
            firstname: firstname ?? existingUser.firstname,
            lastname: lastname ?? existingUser.lastname,
            password: password ?? existingUser.password,
        };
        const updatedUser = await user.update(userToUpdate);
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({
            error: `Failed to update user with ID ${id}.`,
            originalError: err instanceof Error ? err.message : String(err)
        });
    }
};
const destroy = async (req, res) => {
    const deleted = await user.delete(req.body.id);
    res.json(deleted);
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.patch('/users/:id', update);
    app.delete('/users/:id', destroy);
};
export default userRoutes;
//# sourceMappingURL=users.js.map
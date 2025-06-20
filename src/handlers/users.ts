import express, { Request, Response } from 'express'
import { User, UserStore} from '../models/users.js'

import jwt from 'jsonwebtoken'
const user = new UserStore()

const verifyAuthToken(auth) = async (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        next()
    } catch (err) {
        res.status(401)
	res.json(`Invalid Token Recieved: ${err}`);
    }
}

const index = async (req: Request, res: Response) => {
	const getUsers = await user.index();
  	res.json(getUsers);
}

const show = async (req: Request, res: Response) => {
	const showUsers = await user.show(parseInt(req.params.id))
  	res.json(showUsers);
}

const create = async (req: Request, res: Response) => {
	const { firstname, lastname, password } = req.body;
    try {
	    if (!firstname || !lastname || !password) {
	        return res.status(400).send('Missing required query parameters: firstname, lastname, and password are required.')
	    }
	    if (typeof firstname !== 'string' || typeof lastname !== 'string' || typeof password !== 'string') {
	        return res.status(400).send('Query parameters must be strings.')
	    }
  
        const users: User = {
		    firstname: req.body.firstname as string,
		    lastname:  req.body.lastname as string,
		    password:  req.body.password as string,
        }
        const newUser = await user.create(users)
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}   

const userRoutes = (app: express.Application) => {
  app.get('/users',verifyAuthToken, index)
  app.get('/users/:id',verifyAuthToken, show)
  app.post('/users', create)
}

export default userRoutes

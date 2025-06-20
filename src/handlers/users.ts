import express, { Request, Response } from 'express'
import { User, UserStore} from '../models/users.js'

import jwt from 'jsonwebtoken'



const user = new UserStore()

const index = async (req: Request, res: Response) => {
  
  try {
	jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  } catch(err) {
	  res.status(401);
	  res.json(`Invalid Token Recieved: ${err}`);
	  return
  }
	const getUsers = await user.index();
  	res.json(getUsers);
}

const show = async (req: Request, res: Response) => {
  const showUsers = await user.show(parseInt(req.params.id))
  const token = jwt.sign({ User: showUsers }, process.env.TOKEN_SECRET);
  res.json(token);
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
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
}

export default userRoutes

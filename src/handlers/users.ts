import express, { Request, Response } from 'express'
import { User, UserStore} from '../models/users.js'
import bcrypt from 'bcrypt'

const pepper = process.env.BCRYPT_PASSWORD || ''; // Provide a default value
const saltRounds = process.env.SALT_ROUNDS || '10'; // Provide a default value

const user = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await user.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
   const users = await user.show(parseInt(req.params.id))
   res.json(users)
}

const create = async (req: Request, res: Response) => {
	const { firstname, lastname, password } = req.query;
    try {
	    if (!firstname || !lastname || !password) {
	        return res.status(400).send('Missing required query parameters: firstname, lastname, and password are required.')
	    }
	    if (typeof firstname !== 'string' || typeof lastname !== 'string' || typeof password !== 'string') {
	        return res.status(400).send('Query parameters must be strings.')
	    }
        
	    const hash = bcrypt.hashSync(req.query.password + pepper, parseInt(saltRounds))
        const users: User = {
		    firstname: req.query.firstname as string,
		    lastname:  req.query.lastname as string,
		    password:  hash,
        }
        const newUser = await user.create(users)
        res.json(newUser)
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

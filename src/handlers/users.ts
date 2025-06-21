import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users.js";

import jwt from "jsonwebtoken";
const user = new UserStore();

const verifyAuthToken = async (req: Request, res: Response, next) => {
  const authorizationHeader = req.headers.authorization;
  try {
    if (!authorizationHeader) {
      return res.status(401).json("Authorization header missing");
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json("Token missing from Authorization header");
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid Token Recieved: ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({
        error: "Username and password are required for authentication.",
      });
  }
  try {
    const authenticatedUser = await user.authenticate(username, password);
    if (!authenticatedUser) {
      return res
        .status(401)
        .json({ error: "Authentication failed: Invalid credentials." });
    }
    var token = jwt.sign(
      { user: authenticatedUser },
      process.env.TOKEN_SECRET as string,
    );
    res.json(token);
  } catch (error) {
    console.error("Authentication error:", error);
    res
      .status(401)
      .json({ error: "An unexpected error occurred during authentication." });
  }
};

const index = async (req: Request, res: Response) => {
  const getUsers = await user.index();
  res.json(getUsers);
};

const show = async (req: Request, res: Response) => {
  const showUsers = await user.show(parseInt(req.params.id));
  res.json(showUsers);
};

const create = async (req: Request, res: Response) => {
  const { firstname, lastname, password } = req.body;
  try {
    if (!firstname || !lastname || !password) {
      return res
        .status(400)
        .send(
          "Missing required query parameters: firstname, lastname, and password are required.",
        );
    }
    if (
      typeof firstname !== "string" ||
      typeof lastname !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).send("Query parameters must be strings.");
    }

    const users: User = {
      username: req.body.username as string,
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };
    const newUser = await user.create(users);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.post("/authenticate", authenticate);
};

export default userRoutes;

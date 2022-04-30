import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../configs/env"

export const createToken = (uid: string) => {
	return jwt.sign({ sub: uid }, JWT_SECRET!)
}

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET!)
}

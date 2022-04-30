import jwt from "jsonwebtoken"
import { IUser } from "../../type"
import { ECollection } from "../../type/enum"
import { JWT_SECRET } from "../configs/env"
import { firestore } from "../configs/firebase"

export const createToken = (uid: string) => {
	return jwt.sign({ sub: uid }, JWT_SECRET!)
}

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET!)
}

export const extractBearerToken = (bearerToken: string): string => {
	const [bearer, token] = bearerToken.split(" ")
	if (bearer !== "Bearer" || !token) throw new Error("Invalid Bearer token")
	return token
}

export const extractTokenUserMetadata = async (
	token: string
): Promise<IUser> => {
	const { sub } = verifyToken(token)
	const userRes = await firestore
		.collection(ECollection.USER)
		.doc(sub as string)
		.get()

	if (!userRes.exists) {
		throw new Error("User is not exist")
	}

	return userRes.data() as IUser
}

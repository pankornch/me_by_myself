import { FIREBASE_CONFIG_JSON } from "../../src/configs/env"
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

try {
	initializeApp({
		credential: cert(FIREBASE_CONFIG_JSON),
	})
} catch (error: any) {
	if (
		error.message !==
		"The default Firebase app already exists. This means you called initializeApp() more than once without providing an app name as the second argument. In most cases you only need to call initializeApp() once. But if you do want to initialize multiple apps, pass a second argument to initializeApp() to give each app a unique name."
	) {
		console.error(error)
	}
}

export const firestore = getFirestore()

import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface AuthResponse {
	user: any;
	error?: Error;
}

export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		console.log(userCredential);
		return { user: userCredential.user };
	} catch (error) {
		return { user: null, error: error as Error };
	}
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return { user: userCredential.user };
	} catch (error) {
		return { user: null, error: error as Error };
	}
};

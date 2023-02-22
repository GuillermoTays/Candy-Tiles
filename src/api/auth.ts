import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';

export const createUser = async (email: string, nickname: string, password: string): Promise<User> => {
	const createdUserCrendential = await createUserWithEmailAndPassword(auth, email, password);
	await updateProfile(createdUserCrendential.user, {
		displayName: nickname,
	});

	const userRef = doc(db, 'users', createdUserCrendential.user.uid);
	await setDoc(userRef, {
		email,
		nickname,
		password,
		levels: [],
	});

	return createdUserCrendential.user;
};

export const signIn = async ({ email, password }: SignInData): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);
export const logOut = async (): Promise<void> => signOut(auth);

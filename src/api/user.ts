import { updateCurrentUser, updateProfile, User } from 'firebase/auth';
import { collection, deleteDoc, doc, DocumentData, getDocs, query, setDoc, where, WithFieldValue } from 'firebase/firestore';
import { deleteObject, listAll, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase-config';
import { auth } from './../config/firebase-config';

export const updateUserProfile = async (data: User): Promise<void> => {
	await updateProfile(auth.currentUser as User, data);
	return updateCurrentUser(auth, auth.currentUser);
};

export const getUserDocumentByEmail = async (email: string) => {
	const q = query(collection(db, 'users'), where('email', '==', email));
	const response = await getDocs(q);
	return (response?.docs || [])[0] || null;
};

export const updateUserDocument = async (email: string, data: WithFieldValue<DocumentData>) => {
	const uid = (await getUserDocumentByEmail(email))?.id;
	const userRef = doc(db, 'users', uid);
	await setDoc(userRef, data, { merge: true });
};

export const uploadAvatar = async (file: File): Promise<void> => {
	const fileExtension = file.type.split('/')[1];
	const imagePath = `users/avatars/${auth.currentUser?.displayName}/avatar.${fileExtension}`;
	const storageRef = ref(storage, imagePath);
	const uploadResult = await uploadBytes(storageRef, file);

	const fileStorageURL = `https://firebasestorage.googleapis.com/v0/b/${uploadResult.metadata.bucket}/o/${encodeURIComponent(
		uploadResult.metadata.fullPath,
	)}?alt=media&uptated=${Date.now()}`;

	return updateUserProfile({ photoURL: fileStorageURL } as User);
};

export const deleteUserDocument = async (userId: string) => deleteDoc(doc(db, 'users', userId));

export const deleteUserMedia = async (userNickname: string): Promise<void> => {
	const listRef = ref(storage, `users/avatars/${userNickname}`);
	const listResults = await listAll(listRef);
	const deletePromises = listResults.items.map((item) => deleteObject(item));
	Promise.all(deletePromises);
};

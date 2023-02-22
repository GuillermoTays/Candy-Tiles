import { atom } from 'recoil';

const STORAGE_KEY = 'logged-user';
const savedValue = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');

export const loggedUserState = atom<LoggedUserData | null>({
	key: 'loggedUser',
	default: savedValue,
	effects: [
		({ setSelf, onSet }) => {
			savedValue && setSelf(savedValue);
			onSet((newValue) => {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
			});
		},
	],
	dangerouslyAllowMutability: true,
});

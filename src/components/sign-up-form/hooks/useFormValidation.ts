import { collection, getDocs, query, where } from 'firebase/firestore';
import { useMutation } from 'react-query';
import { db } from '../../../config/firebase-config';
import { validateDuplicatedEmail, validateEmail, validateField } from './../../../utils/form';

const validatePasswordLength = (value: string) => value.length > 5;

const validateUsernameLength = (value: string) => value.length < 50;
const validateDuplicatedUsername = async (value: string) => {
	const q = query(collection(db, 'users'), where('nickname', '==', value));
	const response = await getDocs(q);
	return response.empty;
};

const emailValidations: FieldValidation<string>[] = [
	{
		validate: validateEmail,
		failReason: 'Invalid email',
	},
	{
		validate: validateDuplicatedEmail,
		failReason: 'That email is taken. Please try another.',
	},
];

const passwordValidations: FieldValidation<string>[] = [
	{
		validate: validatePasswordLength,
		failReason: 'Password must contain at least 6 characters',
	},
];

const usernameValidations: FieldValidation<string>[] = [
	{
		validate: validateUsernameLength,
		failReason: 'User name must contain 50 characters at much.',
	},
	{
		validate: validateDuplicatedUsername,
		failReason: 'That username is taken. Please try another.',
	},
];

export default () => {
	const emailValidation = useMutation('signUpEmailValidation', (value: string) => validateField(value, emailValidations));
	const usernameValidation = useMutation('signUpUsernameValidation', (value: string) => validateField(value, usernameValidations));
	const passwordValidation = useMutation('signUpPasswordValidation', (value: string) => validateField(value, passwordValidations));

	return {
		emailValidation,
		usernameValidation,
		passwordValidation,
	};
};

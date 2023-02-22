import { findAsync } from './array';
import regularExpressions from './regularExpressions';

export const validateEmail = (value: string) => regularExpressions.validEmail.test(value);

export const validateField = async <T>(fieldValue: T, validations: FieldValidation<T>[]): Promise<FieldValidationResult> => {
	const failedValidation = await findAsync(validations, async (x) => !(await x.validate(fieldValue)));
	const errorMessage = failedValidation?.failReason;

	return {
		valid: !failedValidation,
		validationMessage: errorMessage ? errorMessage : '',
	};
};

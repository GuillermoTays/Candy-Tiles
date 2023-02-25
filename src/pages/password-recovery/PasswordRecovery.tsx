import { LoadingButton } from '@mui/lab';
import { Container, FormHelperText, InputAdornment, Slide, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { useMutation } from 'react-query';
import { sendPaswordRecovery } from '../../api/auth';
import InputAdornmentLoader from '../../components/InputAdornmentLoader';
import TextFieldMain from '../../mui/components/TextFieldMain';
import useFormValidations from './hooks/useFormValidations';
import { FirebaseError } from 'firebase/app';

const errorMessages = {
	'auth/invalid-email': 'That email does not belong to any account.',
	'default': "We couldn't send a verification email. Please try again later.",
} as { [key: string]: string };

const PasswordRecovery = () => {
	const [emailValue, setEmailValue] = useState('');
	const { emailValidation } = useFormValidations();
	const sendRecovery = useMutation<unknown, FirebaseError>('send-recovery', () => sendPaswordRecovery('fafjsdsjkf'));

	const emailOnBlur = () => emailValidation.mutate(emailValue);
	const sendOnClick = () => sendRecovery.mutate();

	const errorMessage = errorMessages[sendRecovery.error?.code || ''] || errorMessages['default'];

	return (
		<Slide direction="down" in={true} mountOnEnter unmountOnExit>
			<Container maxWidth="xs">
				<Stack spacing={2}>
					<Typography variant="h1" color="primary.light" sx={{ fontSize: '2rem', fontFamily: 'YellowCandy' }}>
						Password recovery
					</Typography>
					<TextFieldMain
						label="Email"
						variant="filled"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									{emailValidation.isLoading ? <InputAdornmentLoader /> : <MdEmail className="max-w-[16px]"></MdEmail>}
								</InputAdornment>
							),
						}}
						onChange={(e) => setEmailValue(e.target.value)}
						onBlur={emailOnBlur}
						helperText={emailValidation.data?.validationMessage}
						error={!emailValidation.data?.valid && emailValidation.isSuccess}
					></TextFieldMain>
					<FormHelperText error hidden={!sendRecovery.isError}>
						{errorMessage}
					</FormHelperText>
					<LoadingButton
						variant="contained"
						disableElevation
						sx={{ '&&': { marginLeft: 'auto' } }}
						disabled={!emailValidation.data?.valid}
						loading={sendRecovery.isLoading}
						onClick={sendOnClick}
					>
						Send
					</LoadingButton>
				</Stack>
			</Container>
		</Slide>
	);
};

export default PasswordRecovery;

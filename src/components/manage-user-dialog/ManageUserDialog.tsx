import { Button, DialogContent, Divider, IconButton, LinearProgress, Typography } from '@mui/material';
import Dialog from '../Dialog';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { showManageUserDialogState } from './../../store/showManageUserDialog';
import { loggedUserState } from './../../store/loggedUser';
import { Stack } from '@mui/system';
import AvatarButton from './AvatarButton';
import { useState } from 'react';
import { showDeleteAccountDialogState } from './../../store/showDeleteAccountDialog';

const ManageUserDialog = () => {
	const [showManageUserDialog, setShowManageUserDialog] = useRecoilState(showManageUserDialogState);
	const setShowDeleteAccountDialog = useSetRecoilState(showDeleteAccountDialogState);

	const dialogOnClose = () => setShowManageUserDialog(false);
	const user = useRecoilValue(loggedUserState) as LoggedUserData;
	const [uploadingAvatar, setUploadingAvatar] = useState(false);
	const onDeleteAccountClick = () => {
		setShowDeleteAccountDialog(true);
		dialogOnClose();
	};

	return (
		<Dialog open={showManageUserDialog} onClose={dialogOnClose} maxWidth="xs">
			<DialogContent>
				<Stack spacing={2}>
					{uploadingAvatar && <LinearProgress />}
					<Stack direction="row" spacing={2}>
						<AvatarButton user={user} setUploadingAvatar={setUploadingAvatar} />

						<Stack justifyContent="center" width="150px" minWidth="50px">
							<Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
								{user.nickname}
							</Typography>
							<Typography variant="caption">{user.email}</Typography>
						</Stack>
					</Stack>
					<Divider />
					<Button variant="outlined" size="small" color="primary" sx={{ marginRight: 'auto' }} onClick={onDeleteAccountClick}>
						Delete account
					</Button>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

export default ManageUserDialog;

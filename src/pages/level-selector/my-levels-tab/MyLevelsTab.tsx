import { Box, CircularProgress, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { getUserLevels } from '../../../api/levels';
import { loggedUserState } from '../../../store/loggedUser';
import { LevelWithUserDB } from '../../../types/database-aliases';
import LevelCard from '../LevelCard';
import DeleteLevelDialog from './DeleteLevelDialog';
import LevelActions from './LevelActions';

const LEVELS_PER_PAGE = 5;
const MyLevelsTab = () => {
	const loggedUser = useRecoilValue(loggedUserState);
	const [currentPage, setCurrentPage] = useState(1);
	const myLevels = useMutation((page: number) => getUserLevels(page, LEVELS_PER_PAGE, loggedUser?.auth.id || ''));
	useEffect(() => {
		!!loggedUser && myLevels.mutate(currentPage);
	}, [currentPage]);

	const paginationCount = Math.ceil((myLevels.data?.count || 0) / LEVELS_PER_PAGE);
	const [deleteLevel, setDeleteLevel] = useState<LevelWithUserDB | null>(null);

	return (
		<>
			<Stack overflow="hidden" maxHeight="100%">
				<Stack spacing={1} padding={2} overflow="auto">
					{myLevels.isLoading && (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					)}
					{((myLevels.data?.data || []) as LevelWithUserDB[]).map((level) => (
						<LevelCard key={level.id} level={level} actions={<LevelActions level={level} setLevel={setDeleteLevel} />} />
					))}
				</Stack>
				{paginationCount > 1 && (
					<Box display="flex" padding={2}>
						<Pagination
							page={currentPage}
							onChange={(e, page) => setCurrentPage(page)}
							count={paginationCount}
							color="secondary"
							sx={{ margin: '0 auto' }}
						></Pagination>
					</Box>
				)}
			</Stack>
			<DeleteLevelDialog level={deleteLevel} setLevel={setDeleteLevel} onLevelDeleted={() => myLevels.mutate(currentPage)} />
		</>
	);
};

export default MyLevelsTab;

import { Box, CircularProgress, Pagination } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { getOnlineLevels } from '../../../api/levels';
import { LevelWithUserDB } from '../../../types/database-aliases';
import LevelCard from './LevelCard';

const OnlineLevelsTab = () => {
	const onlineLevelsMutation = useMutation(() => getOnlineLevels());
	useEffect(() => {
		onlineLevelsMutation.mutate();
	}, []);

	return (
		<Stack overflow="hidden" maxHeight="100%">
			<Stack spacing={1} padding={2} overflow="auto">
				{onlineLevelsMutation.isLoading && (
					<Box display="flex" justifyContent="center">
						<CircularProgress />
					</Box>
				)}
				{((onlineLevelsMutation.data?.data || []) as LevelWithUserDB[]).map((level) => (
					<LevelCard key={level.id} level={level} />
				))}
			</Stack>
			<Box display="flex" padding={2}>
				<Pagination page={1} count={2} color="secondary" sx={{ margin: '0 auto' }}></Pagination>
			</Box>
		</Stack>
	);
};

export default OnlineLevelsTab;
